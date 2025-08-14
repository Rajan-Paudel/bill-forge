import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import {
  Header,
  Footer,
  ReportSettings,
  BillTable,
  ImageSelector,
  ConfirmSelectableModeModal,
  FullScreenImageModal,
  FileNameModal,
  HistoryModal,
  OptionsManagerModal,
  LoadJSONModal,
  ClearAllDataModal,
  RemoveOptionModal,
  SaveModal,
  DuplicateSessionModal,
  SaveConfirmationModal,
  CurrencyModal,
  NoAttachmentsModal,
} from './components';

// Hooks
import { usePDFGeneration, useLocalStorage } from './hooks';

// Utilities
import { generateSessionId, generateBillId, generateHistoryId } from './utils/idGenerator';
import { detectCurrencyFromBrowser } from './utils/currencyDetection';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [bills, setBills] = useState([]);
  const [reportTitle, setReportTitle] = useState("Monthly Bill Report");
  const [showDateRange, setShowDateRange] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: null,
  });
  const [isSelectableMode, setIsSelectableMode] = useState(false);
  const [showSelectableModeConfirm, setShowSelectableModeConfirm] = useState(false);
  const [selectableOptions, setSelectableOptions] = useState([
    { label: "Hemodialysis", amount: 1300 },
    { label: "Hemodialysis with New Set", amount: 2000 },
    { label: "Regular Checkup", amount: 500 },
    { label: "Blood Test", amount: 800 },
  ]);
  const [showFileNameDialog, setShowFileNameDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSessionRestored, setShowSessionRestored] = useState(false);
  const [showOptionsManager, setShowOptionsManager] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [newOptionAmount, setNewOptionAmount] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showLoadJSONDialog, setShowLoadJSONDialog] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [showRemoveOptionModal, setShowRemoveOptionModal] = useState(false);
  const [optionToRemove, setOptionToRemove] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateItem, setDuplicateItem] = useState(null);
  const [pendingJsonData, setPendingJsonData] = useState(null);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [existingSaveItem, setExistingSaveItem] = useState(null);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showNoAttachmentsModal, setShowNoAttachmentsModal] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState({
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee'
  });

  // Custom hooks
  const { createPDF } = usePDFGeneration();
  const {
    loadAutoSavedState,
    loadHistoryData: loadHistoryDataFromStorage,
    saveToHistory,
    deleteHistoryFromStorage,
  } = useLocalStorage();

  // Get sorted bills based on current sort configuration
  const getSortedBills = () => {
    if (!sortConfig.field) {
      return bills;
    }

    const sorted = [...bills].sort((a, b) => {
      if (sortConfig.field === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (sortConfig.field === "amount") {
        return sortConfig.direction === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      return 0;
    });

    return sorted;
  };

  // Handle sorting
  const handleSort = (field) => {
    let direction = "asc";

    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.field === field && sortConfig.direction === "desc") {
      direction = null;
      field = null;
    }

    setSortConfig({ field, direction });
  };

  const sortedBills = getSortedBills();

  useEffect(() => {
    const loadHistoryData = () => {
      const history = loadHistoryDataFromStorage();
      setHistoryData(history);
    };

    const loadAutoSavedStateData = () => {
      const state = loadAutoSavedState();
      if (state) {
        setSessionId(state.sessionId || generateSessionId());
        setBills(state.bills || []);
        setReportTitle(state.reportTitle || "Monthly Bill Report");
        setShowDateRange(state.showDateRange || false);
        setIsSelectableMode(state.isSelectableMode || false);
        // selectedFiles not restored - start fresh with no attachments
        setSortConfig(state.sortConfig || { field: null, direction: null });
        setSelectableOptions(
          state.selectableOptions || [
            { label: "Hemodialysis", amount: 1300 },
            { label: "Hemodialysis with New Set", amount: 2000 },
            { label: "Regular Checkup", amount: 500 },
            { label: "Blood Test", amount: 800 },
          ]
        );

        // Load currency from auto-saved state if available
        if (state.currentCurrency) {
          setCurrentCurrency(state.currentCurrency);
        }

        setShowSessionRestored(true);
        setTimeout(() => setShowSessionRestored(false), 3000);

        console.log("Auto-saved state loaded successfully:", {
          sessionId: state.sessionId,
          bills: state.bills?.length || 0,
          reportTitle: state.reportTitle,
          lastAutoSave: state.lastAutoSave,
        });
      } else {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        console.log("No auto-saved state found - starting with clean slate, sessionId:", newSessionId);
      }
    };

    console.log("useEffect triggered - loading data");
    loadHistoryData();
    loadAutoSavedStateData();

    setTimeout(() => setIsInitialLoad(false), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Auto-save state whenever it changes (but not on initial load)
  useEffect(() => {
    if (!isInitialLoad && sessionId) {
      try {
        const timestamp = new Date().toISOString();
        const currentState = {
          sessionId,
          bills,
          reportTitle,
          showDateRange,
          isSelectableMode,
          // selectedFiles excluded - don't persist attachments
          sortConfig,
          selectableOptions,
          currentCurrency,
          lastAutoSave: timestamp,
        };
        localStorage.setItem("billReportAutoSave", JSON.stringify(currentState));
      } catch (error) {
        console.error("Failed to auto-save state:", error);
      }
    }
  }, [
    sessionId,
    bills,
    reportTitle,
    showDateRange,
    isSelectableMode,
    // selectedFiles removed from dependencies - don't trigger auto-save
    sortConfig,
    selectableOptions,
    currentCurrency,
    isInitialLoad,
  ]);

  // Dark mode effect
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Currency initialization and persistence
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem("selectedCurrency");
      if (savedCurrency) {
        try {
          const parsedCurrency = JSON.parse(savedCurrency);
          if (parsedCurrency && parsedCurrency.code && parsedCurrency.symbol) {
            setCurrentCurrency(parsedCurrency);
          } else {
            throw new Error("Invalid currency data");
          }
        } catch (error) {
          console.error("Failed to load saved currency:", error);
          // Fallback to browser detection if saved currency is invalid
          try {
            const detectedCurrency = detectCurrencyFromBrowser();
            setCurrentCurrency(detectedCurrency);
            localStorage.setItem("selectedCurrency", JSON.stringify(detectedCurrency));
          } catch (detectionError) {
            console.error("Currency detection failed:", detectionError);
            // Ultimate fallback - keep default INR
          }
        }
      } else {
        // No saved currency, detect from browser
        try {
          const detectedCurrency = detectCurrencyFromBrowser();
          setCurrentCurrency(detectedCurrency);
          localStorage.setItem("selectedCurrency", JSON.stringify(detectedCurrency));
          console.log("Auto-detected currency:", detectedCurrency);
        } catch (detectionError) {
          console.error("Currency detection failed:", detectionError);
          // Keep default INR currency
        }
      }
    } catch (error) {
      console.error("Currency initialization failed:", error);
      // Keep default INR currency
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Currency handlers
  const handleCurrencySelect = (currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem("selectedCurrency", JSON.stringify(currency));
  };

  const openCurrencyModal = () => {
    setShowCurrencyModal(true);
  };

  // Handle no attachments modal
  const handleNoAttachmentsConfirm = () => {
    setShowNoAttachmentsModal(false);
    // Proceed with PDF generation without attachments
    setFileName(
      reportTitle.replace(/\s+/g, "_") +
        "_" +
        new Date().toISOString().split("T")[0]
    );
    setShowFileNameDialog(true);
  };

  const handleNoAttachmentsCancel = () => {
    setShowNoAttachmentsModal(false);
    // User can add attachments if they want
  };


  // Clear all data and start fresh
  const clearAllData = () => {
    setShowClearAllModal(true);
  };

  // Confirm clear all data
  const confirmClearAllData = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setBills([]);
    setReportTitle("Monthly Bill Report");
    setShowDateRange(false);
    setIsSelectableMode(false);
    setSelectedFiles([]);
    setSortConfig({ field: null, direction: null });
    localStorage.removeItem("billReportAutoSave");
    console.log("Data cleared - new session ID:", newSessionId);
  };

  // File upload handlers
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));
    
    setSelectedFiles([...selectedFiles, ...newFiles]);
    
    // Clear the input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleFileRemove = (fileId) => {
    const fileToRemove = selectedFiles.find(f => f.id === fileId);
    if (fileToRemove && fileToRemove.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    setSelectedFiles(selectedFiles.filter(f => f.id !== fileId));
  };


  // Save current state to history manually
  const saveToHistoryData = () => {
    // Check if current session already exists in history
    const existingItem = historyData.find(item => item.sessionId === sessionId);
    
    if (existingItem) {
      // Show confirmation modal for existing session
      setExistingSaveItem(existingItem);
      setShowSaveConfirmModal(true);
    } else {
      // Show normal save modal for new session
      setShowSaveModal(true);
    }
  };

  // Handle manual save from modal
  const handleManualSave = (filename) => {
    const timestamp = new Date().toISOString();
    const historyItem = {
      id: generateHistoryId(),
      sessionId,
      filename,
      timestamp,
      reportTitle,
      showDateRange,
      isSelectableMode,
      bills: [...bills],
      // selectedFiles excluded from history - don't save attachments
      sortConfig: { ...sortConfig },
      selectableOptions: [...selectableOptions],
      currentCurrency: { ...currentCurrency },
    };

    const updatedHistory = saveToHistory(historyItem, historyData);
    setHistoryData(updatedHistory);
    return historyItem;
  };

  // Handle updating existing save
  const handleUpdateExistingSave = () => {
    if (existingSaveItem) {
      const timestamp = new Date().toISOString();
      const updatedHistoryItem = {
        ...existingSaveItem,
        timestamp,
        reportTitle,
        showDateRange,
        isSelectableMode,
        bills: [...bills],
        sortConfig: { ...sortConfig },
        selectableOptions: [...selectableOptions],
        currentCurrency: { ...currentCurrency },
      };

      const updatedHistory = saveToHistory(updatedHistoryItem, historyData);
      setHistoryData(updatedHistory);
      setShowSaveConfirmModal(false);
      setExistingSaveItem(null);
    }
  };

  // Handle creating new save (generate new session ID)
  const handleCreateNewSave = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setShowSaveConfirmModal(false);
    setExistingSaveItem(null);
    // Show save modal for new session
    setTimeout(() => setShowSaveModal(true), 100);
  };

  // Handle save confirmation modal close
  const handleSaveConfirmClose = () => {
    setShowSaveConfirmModal(false);
    setExistingSaveItem(null);
  };

  // Check if current session is already saved
  const isSessionSaved = () => {
    return historyData.some(item => item.sessionId === sessionId);
  };

  // Save to history with filename for PDF generation (separate from manual save)
  const saveToHistoryWithFilename = (filename) => {
    // Only save if session is not already in history
    if (!isSessionSaved()) {
      const timestamp = new Date().toISOString();
      const historyItem = {
        id: generateHistoryId(),
        sessionId,
        filename,
        timestamp,
        reportTitle,
        showDateRange,
        isSelectableMode,
        bills: [...bills],
        // selectedFiles excluded from history - don't save attachments
        sortConfig: { ...sortConfig },
        selectableOptions: [...selectableOptions],
        currentCurrency: { ...currentCurrency },
      };

      const updatedHistory = saveToHistory(historyItem, historyData);
      setHistoryData(updatedHistory);
      return historyItem;
    }
    return null;
  };

  // Download JSON file for a history item
  const downloadJSON = (historyItem) => {
    try {
      const blob = new Blob([JSON.stringify(historyItem, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${historyItem.filename}_state.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download JSON:", error);
    }
  };

  // Load state from history
  const loadFromHistory = (historyItem) => {
    setSessionId(historyItem.sessionId || historyItem.id); // Use sessionId if available, fallback to id for backward compatibility
    setBills(historyItem.bills);
    setReportTitle(historyItem.reportTitle);
    setShowDateRange(historyItem.showDateRange);
    setIsSelectableMode(historyItem.isSelectableMode || false);
    // selectedFiles not loaded from history - start with no attachments
    setSortConfig(historyItem.sortConfig);
    if (historyItem.selectableOptions) {
      setSelectableOptions(historyItem.selectableOptions);
    }
    
    // Load currency from history data, or detect from browser if not found
    if (historyItem.currentCurrency) {
      setCurrentCurrency(historyItem.currentCurrency);
      localStorage.setItem("selectedCurrency", JSON.stringify(historyItem.currentCurrency));
    } else {
      const detectedCurrency = detectCurrencyFromBrowser();
      setCurrentCurrency(detectedCurrency);
      localStorage.setItem("selectedCurrency", JSON.stringify(detectedCurrency));
      console.log("No currency in history, auto-detected:", detectedCurrency);
    }
    
    setShowHistoryPopup(false);
    console.log("Loaded from history, sessionId:", historyItem.sessionId || historyItem.id);
  };

  // Delete history item
  const deleteHistoryItem = (itemId) => {
    const updatedHistory = deleteHistoryFromStorage(itemId, historyData);
    setHistoryData(updatedHistory);
  };

  // Load JSON from file
  const handleJSONFileLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        if (jsonData.bills && Array.isArray(jsonData.bills)) {
          // Check if sessionId already exists in history
          const existingItem = jsonData.sessionId ? 
            historyData.find(item => item.sessionId === jsonData.sessionId) : null;
          
          if (existingItem) {
            // Show duplicate modal
            setDuplicateItem(existingItem);
            setPendingJsonData(jsonData);
            setShowDuplicateModal(true);
            setShowLoadJSONDialog(false);
          } else {
            // Load directly if no duplicate
            loadJsonData(jsonData);
            setShowLoadJSONDialog(false);
          }
        } else {
          alert(
            "Invalid JSON file format. Please select a valid bill report JSON file."
          );
        }
      } catch (error) {
        alert(
          "Error reading JSON file. Please make sure it's a valid JSON format."
        );
        console.error("JSON parse error:", error);
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  // Load JSON data into state
  const loadJsonData = (jsonData) => {
    setSessionId(jsonData.sessionId || generateSessionId());
    setBills(jsonData.bills || []);
    setReportTitle(jsonData.reportTitle || "Monthly Bill Report");
    setShowDateRange(jsonData.showDateRange || false);
    setIsSelectableMode(jsonData.isSelectableMode || false);
    setSortConfig(
      jsonData.sortConfig || { field: null, direction: null }
    );
    if (jsonData.selectableOptions) {
      setSelectableOptions(jsonData.selectableOptions);
    }
    
    // Load currency from JSON data, or detect from browser if not found
    if (jsonData.currentCurrency) {
      setCurrentCurrency(jsonData.currentCurrency);
      localStorage.setItem("selectedCurrency", JSON.stringify(jsonData.currentCurrency));
    } else {
      const detectedCurrency = detectCurrencyFromBrowser();
      setCurrentCurrency(detectedCurrency);
      localStorage.setItem("selectedCurrency", JSON.stringify(detectedCurrency));
      console.log("No currency in JSON, auto-detected:", detectedCurrency);
    }
    
    console.log("Loaded from JSON, sessionId:", jsonData.sessionId || "generated new");
  };

  // Handle duplicate session confirmation
  const handleDuplicateConfirm = () => {
    if (pendingJsonData) {
      loadJsonData(pendingJsonData);
      setPendingJsonData(null);
    }
    setShowDuplicateModal(false);
    setDuplicateItem(null);
  };

  // Handle duplicate session cancellation
  const handleDuplicateCancel = () => {
    setPendingJsonData(null);
    setShowDuplicateModal(false);
    setDuplicateItem(null);
  };

  const getTotalAmount = () => {
    return sortedBills
      .reduce((total, bill) => total + bill.amount, 0)
      .toFixed(2);
  };

  const getDateRange = () => {
    if (sortedBills.length === 0) return "";
    const firstDate = sortedBills[0].date;
    const lastDate = sortedBills[sortedBills.length - 1].date;
    return `${firstDate} to ${lastDate}`;
  };

  const getNextBillDate = () => {
    if (bills.length === 0) {
      return new Date().toISOString().split("T")[0];
    }

    const sortedByDate = [...bills].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const lastDate = new Date(sortedByDate[0].date);

    if (isSelectableMode) {
      lastDate.setDate(lastDate.getDate() + 3);
    } else {
      lastDate.setMonth(lastDate.getMonth() + 1);
    }

    return lastDate.toISOString().split("T")[0];
  };

  const addNewBill = () => {
    const newBill = {
      id: generateBillId(),
      title: isSelectableMode ? selectableOptions[0].label : "New Bill",
      date: getNextBillDate(),
      amount: isSelectableMode ? selectableOptions[0].amount : 0,
    };
    setBills([newBill,...bills]);
    
    // Auto scroll to bottom after adding new bill
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleSelectableModeChange = (checked) => {
    if (checked && bills.length > 0) {
      setShowSelectableModeConfirm(true);
    } else {
      setIsSelectableMode(checked);
    }
  };

  const confirmSelectableMode = (confirm) => {
    if (confirm) {
      setIsSelectableMode(true);
    }
    setShowSelectableModeConfirm(false);
  };

  // Add new selectable option
  const addSelectableOption = () => {
    if (!newOptionLabel.trim() || !newOptionAmount.trim()) return;

    const amount = parseFloat(newOptionAmount) || 0;
    const newOption = {
      label: newOptionLabel.trim(),
      amount: amount,
    };

    setSelectableOptions([...selectableOptions, newOption]);
    setNewOptionLabel("");
    setNewOptionAmount("");
  };

  // Remove selectable option and associated bills
  const removeSelectableOption = (optionLabel) => {
    const option = selectableOptions.find(opt => opt.label === optionLabel);
    setOptionToRemove(option);
    setShowRemoveOptionModal(true);
  };

  // Confirm remove selectable option
  const confirmRemoveSelectableOption = () => {
    if (optionToRemove) {
      setSelectableOptions(
        selectableOptions.filter((option) => option.label !== optionToRemove.label)
      );
      setBills(bills.filter((bill) => bill.title !== optionToRemove.label));
      setOptionToRemove(null);
    }
  };

  const updateBill = (id, field, value) => {
    if (field === "title" && isSelectableMode) {
      const selectedOption = selectableOptions.find(
        (option) => option.label === value
      );
      if (selectedOption) {
        setBills(
          bills.map((bill) =>
            bill.id === id
              ? { ...bill, title: value, amount: selectedOption.amount }
              : bill
          )
        );
        return;
      }
    }

    if (field === "amount") {
      const numericValue = value === "" ? 0 : parseFloat(value) || 0;
      setBills(
        bills.map((bill) =>
          bill.id === id ? { ...bill, [field]: numericValue } : bill
        )
      );
    } else {
      setBills(
        bills.map((bill) =>
          bill.id === id ? { ...bill, [field]: value } : bill
        )
      );
    }
  };

  const deleteBill = (id) => {
    setBills(bills.filter((bill) => bill.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedFiles(items);
  };

  const generatePDF = async () => {
    // Always show image selector popup
    setShowImagePopup(true);
  };

  // Handle no attachments from ImageSelector
  const handleNoAttachmentsFromSelector = () => {
    setShowImagePopup(false);
    setShowNoAttachmentsModal(true);
  };

  const handleCreatePDF = () => {
    setShowImagePopup(false);
    setFileName(
      reportTitle.replace(/\s+/g, "_") +
        "_" +
        new Date().toISOString().split("T")[0]
    );
    setShowFileNameDialog(true);
  };

  const confirmCreatePDF = async () => {
    if (!fileName.trim()) return;

    await createPDF(
      reportTitle,
      showDateRange,
      sortedBills,
      selectedFiles,
      fileName,
      getDateRange,
      getTotalAmount
    );

    saveToHistoryWithFilename(fileName);
    setShowFileNameDialog(false);
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-backgroundColor dark:bg-backgroundDarkColor transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          currentCurrency={currentCurrency}
          onCurrencyClick={openCurrencyModal}
        />

        <div className="space-y-8">
          <ReportSettings
            reportTitle={reportTitle}
            setReportTitle={setReportTitle}
            showDateRange={showDateRange}
            setShowDateRange={setShowDateRange}
            isSelectableMode={isSelectableMode}
            handleSelectableModeChange={handleSelectableModeChange}
            setShowOptionsManager={setShowOptionsManager}
            addNewBill={addNewBill}
            setShowHistoryPopup={setShowHistoryPopup}
            setShowLoadJSONDialog={setShowLoadJSONDialog}
            generatePDF={generatePDF}
            showSessionRestored={showSessionRestored}
            clearAllData={clearAllData}
            saveToHistory={saveToHistoryData}
          />

          <BillTable
            sortedBills={sortedBills}
            sortConfig={sortConfig}
            handleSort={handleSort}
            updateBill={updateBill}
            deleteBill={deleteBill}
            getTotalAmount={getTotalAmount}
            isSelectableMode={isSelectableMode}
            selectableOptions={selectableOptions}
            currentCurrency={currentCurrency}
          />
        </div>
      </div>

      <ImageSelector
        showImagePopup={showImagePopup}
        setShowImagePopup={setShowImagePopup}
        selectedFiles={selectedFiles}
        handleFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        onDragEnd={onDragEnd}
        setFullScreenImage={setFullScreenImage}
        handleCreatePDF={handleCreatePDF}
        onNoAttachments={handleNoAttachmentsFromSelector}
      />

      <ConfirmSelectableModeModal
        showSelectableModeConfirm={showSelectableModeConfirm}
        confirmSelectableMode={confirmSelectableMode}
        selectableOptions={selectableOptions}
      />

      <FullScreenImageModal
        fullScreenImage={fullScreenImage}
        setFullScreenImage={setFullScreenImage}
      />

      <FileNameModal
        showFileNameDialog={showFileNameDialog}
        setShowFileNameDialog={setShowFileNameDialog}
        fileName={fileName}
        setFileName={setFileName}
        confirmCreatePDF={confirmCreatePDF}
      />

      <HistoryModal
        showHistoryPopup={showHistoryPopup}
        setShowHistoryPopup={setShowHistoryPopup}
        historyData={historyData}
        loadFromHistory={loadFromHistory}
        downloadJSON={downloadJSON}
        deleteHistoryItem={deleteHistoryItem}
        currentCurrency={currentCurrency}
      />

      <OptionsManagerModal
        showOptionsManager={showOptionsManager}
        setShowOptionsManager={setShowOptionsManager}
        selectableOptions={selectableOptions}
        bills={bills}
        removeSelectableOption={removeSelectableOption}
        newOptionLabel={newOptionLabel}
        setNewOptionLabel={setNewOptionLabel}
        newOptionAmount={newOptionAmount}
        setNewOptionAmount={setNewOptionAmount}
        addSelectableOption={addSelectableOption}
      />

      <LoadJSONModal
        showLoadJSONDialog={showLoadJSONDialog}
        setShowLoadJSONDialog={setShowLoadJSONDialog}
        handleJSONFileLoad={handleJSONFileLoad}
      />

      <ClearAllDataModal
        showClearAllModal={showClearAllModal}
        setShowClearAllModal={setShowClearAllModal}
        confirmClearAll={confirmClearAllData}
      />

      <RemoveOptionModal
        showRemoveOptionModal={showRemoveOptionModal}
        setShowRemoveOptionModal={setShowRemoveOptionModal}
        optionToRemove={optionToRemove}
        billsUsingOption={optionToRemove ? bills.filter((bill) => bill.title === optionToRemove.label).length : 0}
        confirmRemoveOption={confirmRemoveSelectableOption}
        isLastOption={selectableOptions.length <= 1}
      />

      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleManualSave}
        defaultFilename={reportTitle.replace(/\s+/g, "_") + "_" + new Date().toISOString().split("T")[0]}
      />

      <DuplicateSessionModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        onModify={handleDuplicateConfirm}
        onCancel={handleDuplicateCancel}
        existingItem={duplicateItem}
      />

      <SaveConfirmationModal
        isOpen={showSaveConfirmModal}
        onClose={handleSaveConfirmClose}
        onModifyExisting={handleUpdateExistingSave}
        onCreateNew={handleCreateNewSave}
        existingItem={existingSaveItem}
      />

      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        onSelect={handleCurrencySelect}
        currentCurrency={currentCurrency}
      />

      <NoAttachmentsModal
        isOpen={showNoAttachmentsModal}
        onClose={() => setShowNoAttachmentsModal(false)}
        onConfirm={handleNoAttachmentsConfirm}
        onCancel={handleNoAttachmentsCancel}
      />

      <Footer />
    </div>
  );
}

export default App;