import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

export const usePDFGeneration = () => {
  const createPDF = async (
    reportTitle,
    showDateRange,
    sortedBills,
    selectedFiles,
    fileName,
    getDateRange,
    getTotalAmount
  ) => {
    // Create the main PDF document using pdf-lib for better PDF merging support
    const mainPdf = await PDFDocument.create();
    
    // Create the bills table using jsPDF first
    const billsPdf = new jsPDF();
    const pageWidth = billsPdf.internal.pageSize.getWidth();
    const pageHeight = billsPdf.internal.pageSize.getHeight();
    let yPosition = 15; // Enough space for title (18pt font needs ~15pt from top)

    // Report title with better styling
    billsPdf.setFontSize(18); // Reduced from 20 to 18
    billsPdf.setFont("helvetica", "bold");
    billsPdf.text(reportTitle, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8; // Reduced spacing after title

    if (showDateRange) {
      billsPdf.setFontSize(10); // Reduced from 12 to 10
      billsPdf.setFont("helvetica", "normal");
      billsPdf.text(getDateRange(), pageWidth / 2, yPosition, { align: "center" });
      yPosition += 6; // Reduced spacing after date range
    }

    yPosition += 6; // Reduced spacing before table

    // Helper function to split text into lines that fit within a given width
    const splitTextToLines = (text, maxWidth, fontSize) => {
      billsPdf.setFontSize(fontSize);
      const words = text.toString().split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const textWidth = billsPdf.getTextWidth(testLine);
        
        if (textWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            // Single word is too long, force break it
            lines.push(word);
          }
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines.length > 0 ? lines : [''];
    };

    // Prepare table data with text wrapping
    const tableData = [];
    const rowHeights = [];
    const baseRowHeight = 10; // Reduced from 12 to 10
    const minRowHeight = 12; // Reduced from 16 to 12
    const lineHeight = 7; // Reduced from 10 to 7 for more compact text
    const padding = 1.5; // Reduced from 2 to 1.5
    const bottomMargin = 5; // Minimal bottom margin for page breaks
    
    // Smaller font sizes and adjusted column widths for better fit
    const headerFontSize = 10;
    const dataFontSize = 8;
    const totalFontSize = 9;
    
    // Adjusted column widths to fit more content with minimal margins
    const colWidths = [20, 110, 35, 35]; // Increased Bill Name column for better use of space
    const tableWidth = colWidths.reduce((a, b) => a + b, 0);

    // Header row
    const headerRow = ["Sr. No", "Bill Name", "Date", "Amount"];
    tableData.push(headerRow);
    rowHeights.push(minRowHeight);

    // Data rows with text wrapping calculation
    sortedBills.forEach((bill, index) => {
      const row = [
        (index + 1).toString(),
        bill.title,
        bill.date,
        bill.amount.toFixed(2),
      ];
      
      // Calculate max lines needed for this row
      let maxLines = 1;
      row.forEach((cell, colIndex) => {
        if (colIndex === 1) { // Bill Name column - check for wrapping
          const maxWidth = colWidths[colIndex] - (padding * 2);
          const lines = splitTextToLines(cell, maxWidth, dataFontSize);
          maxLines = Math.max(maxLines, lines.length);
        }
      });
      
      const rowHeight = Math.max(minRowHeight, baseRowHeight + (maxLines - 1) * lineHeight);
      tableData.push(row);
      rowHeights.push(rowHeight);
    });

    // Total row
    const totalRow = ["", "", "Total:", getTotalAmount()];
    tableData.push(totalRow);
    rowHeights.push(minRowHeight);

    // Function to draw table header
    const drawTableHeader = (currentY) => {
      let currentX = 3;
      const headerRow = tableData[0];
      const headerRowHeight = rowHeights[0];
      
      // Header row styling
      billsPdf.setFontSize(headerFontSize);
      billsPdf.setFont("helvetica", "bold");
      
      // Draw header background
      billsPdf.setFillColor(230, 230, 230);
      billsPdf.rect(currentX, currentY, tableWidth, headerRowHeight, "F");
      
      // Draw header border
      billsPdf.setDrawColor(100, 100, 100);
      billsPdf.setLineWidth(0.3);
      billsPdf.rect(currentX, currentY, tableWidth, headerRowHeight);
      
      // Draw header text
      headerRow.forEach((cell, colIndex) => {
        const cellWidth = colWidths[colIndex];
        
        // Draw cell border
        billsPdf.setDrawColor(180, 180, 180);
        billsPdf.setLineWidth(0.2);
        billsPdf.rect(currentX, currentY, cellWidth, headerRowHeight);
        
        // Add header text
        const textY = currentY + headerRowHeight / 2 + 2;
        if (colIndex === 0 || colIndex === 3) {
          billsPdf.text(cell, currentX + cellWidth - padding, textY, { align: "right" });
        } else {
          billsPdf.text(cell, currentX + padding, textY);
        }
        
        currentX += cellWidth;
      });
      
      return currentY + headerRowHeight;
    };

    // Draw the table with page breaks
    let currentY = yPosition;
    
    // Draw initial header
    currentY = drawTableHeader(currentY);

    // Draw data rows and total row
    for (let rowIndex = 1; rowIndex < tableData.length; rowIndex++) {
      const row = tableData[rowIndex];
      const rowHeight = rowHeights[rowIndex];
      
      // Check if row fits on current page
      if (currentY + rowHeight > pageHeight - bottomMargin) {
        // Add new page and draw header again
        billsPdf.addPage();
        currentY = 10; // Start with enough space for table header
        currentY = drawTableHeader(currentY);
      }
      
      let currentX = 3;
      
      // Set font and style based on row type
      if (rowIndex === tableData.length - 1) {
        // Total row
        billsPdf.setFontSize(totalFontSize);
        billsPdf.setFont("helvetica", "bold");
        
        // Draw total row background
        billsPdf.setFillColor(245, 245, 245);
        billsPdf.rect(currentX, currentY, tableWidth, rowHeight, "F");
      } else {
        // Data row
        billsPdf.setFontSize(dataFontSize);
        billsPdf.setFont("helvetica", "normal");
      }

      // Draw cells and text
      // eslint-disable-next-line no-loop-func
      row.forEach((cell, colIndex) => {
        const cellWidth = colWidths[colIndex];
        
        // Draw cell border
        billsPdf.setDrawColor(180, 180, 180);
        billsPdf.setLineWidth(0.2);
        billsPdf.rect(currentX, currentY, cellWidth, rowHeight);

        // Add text with wrapping for Bill Name column
        if (colIndex === 1 && rowIndex > 0 && rowIndex < tableData.length - 1) {
          // Bill Name column with text wrapping
          const maxWidth = cellWidth - (padding * 2);
          const lines = splitTextToLines(cell, maxWidth, dataFontSize);
          
          for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const textY = currentY + padding + (lineIndex + 1) * lineHeight;
            billsPdf.text(line, currentX + padding, textY);
          }
        } else {
          // Other columns - single line text
          const textY = currentY + rowHeight / 2 + 1.5; // Reduced from +2 to +1.5
          
          if (colIndex === 0 || colIndex === 3) {
            // Right align numbers
            billsPdf.text(cell, currentX + cellWidth - padding, textY, {
              align: "right",
            });
          } else {
            // Left align text
            billsPdf.text(cell, currentX + padding, textY);
          }
        }

        currentX += cellWidth;
      });

      currentY += rowHeight;
    }

    // Convert the bills table to pdf-lib format and add to main PDF
    const billsPdfBytes = billsPdf.output('arraybuffer');
    const billsPdfDoc = await PDFDocument.load(billsPdfBytes);
    const billsPages = await mainPdf.copyPages(billsPdfDoc, billsPdfDoc.getPageIndices());
    billsPages.forEach((page) => mainPdf.addPage(page));

    // Process uploaded files - images and PDFs
    for (let i = 0; i < selectedFiles.length; i++) {
      const fileData = selectedFiles[i];

      if (fileData.type.startsWith('image/')) {
        // Handle image files - one per page using pdf-lib
        try {
          console.log(`Processing image: ${fileData.name}`);

          // Create image element and load from file
          const imgElement = new Image();
          
          await new Promise((resolve, reject) => {
            imgElement.onload = () => {
              console.log(
                `Image loaded successfully: ${fileData.name} (${imgElement.naturalWidth}x${imgElement.naturalHeight})`
              );
              resolve();
            };

            imgElement.onerror = (error) => {
              console.error(`Failed to load image: ${fileData.name}`, error);
              reject(error);
            };

            // Use the blob URL we created during upload
            imgElement.src = fileData.url;
          });

          // Create canvas and draw image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = imgElement.naturalWidth;
          canvas.height = imgElement.naturalHeight;
          ctx.drawImage(imgElement, 0, 0);

          // Get image data as bytes
          const imgDataUrl = canvas.toDataURL("image/jpeg", 0.9);
          const imgBytes = Uint8Array.from(atob(imgDataUrl.split(',')[1]), c => c.charCodeAt(0));

          // Embed image in pdf-lib
          const image = await mainPdf.embedJpg(imgBytes);
          const imageDims = image.scale(1);

          // Add a new page for the image
          const page = mainPdf.addPage();
          const { width: pageWidth, height: pageHeight } = page.getSize();

          // Calculate dimensions to fit on page while maintaining aspect ratio
          const availableWidth = pageWidth - 6; // 3pt margin on each side
          const availableHeight = pageHeight - 6; // 3pt margin top and bottom

          const imgAspectRatio = imageDims.width / imageDims.height;

          let finalWidth, finalHeight;

          if (availableWidth / imgAspectRatio <= availableHeight) {
            // Width is the limiting factor
            finalWidth = availableWidth;
            finalHeight = availableWidth / imgAspectRatio;
          } else {
            // Height is the limiting factor
            finalHeight = availableHeight;
            finalWidth = availableHeight * imgAspectRatio;
          }

          // Center the image on the page
          const xPosition = (pageWidth - finalWidth) / 2;
          const yPosition = (pageHeight - finalHeight) / 2;

          // Draw the image on the page
          page.drawImage(image, {
            x: xPosition,
            y: yPosition,
            width: finalWidth,
            height: finalHeight,
          });

          console.log(`Successfully added image to PDF: ${fileData.name}`);
        } catch (error) {
          console.error(`Error processing image ${fileData.name}:`, error);

          // Add error page
          const page = mainPdf.addPage();
          const { height: pageHeight } = page.getSize();
          
          page.drawText(`[Image could not be loaded: ${fileData.name}]`, {
            x: 50,
            y: pageHeight / 2,
            size: 12,
          });
          page.drawText(`Error: ${error.message || "Unknown error"}`, {
            x: 50,
            y: pageHeight / 2 - 20,
            size: 10,
          });
        }
      } else if (fileData.type === 'application/pdf') {
        // Handle PDF files - merge all pages using pdf-lib
        try {
          console.log(`Processing PDF: ${fileData.name}`);
          
          // Read the PDF file as array buffer
          const arrayBuffer = await fileData.file.arrayBuffer();
          
          // Load the PDF document using pdf-lib
          const uploadedPdf = await PDFDocument.load(arrayBuffer);
          const pageCount = uploadedPdf.getPageCount();
          
          console.log(`PDF has ${pageCount} pages: ${fileData.name}`);
          
          // Copy all pages from the uploaded PDF to main PDF
          const pagesToCopy = Array.from({ length: pageCount }, (_, i) => i);
          const copiedPages = await mainPdf.copyPages(uploadedPdf, pagesToCopy);
          
          // Add all copied pages to the main PDF
          copiedPages.forEach((page) => {
            mainPdf.addPage(page);
          });
          
          console.log(`Successfully merged PDF: ${fileData.name} (${pageCount} pages)`);
          
        } catch (error) {
          console.error(`Error processing PDF ${fileData.name}:`, error);
          
          // Add error page
          const page = mainPdf.addPage();
          const { height: pageHeight } = page.getSize();
          
          page.drawText(`[PDF could not be processed: ${fileData.name}]`, {
            x: 50,
            y: pageHeight / 2,
            size: 12,
          });
          page.drawText(`Error: ${error.message || "Unknown error"}`, {
            x: 50,
            y: pageHeight / 2 - 20,
            size: 10,
          });
        }
      }
    }

    // Save the final merged PDF
    const finalPdfBytes = await mainPdf.save();
    const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${
      fileName ||
      reportTitle.replace(/\s+/g, "_") +
        "_" +
        new Date().toISOString().split("T")[0]
    }.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
  };

  return { createPDF };
};