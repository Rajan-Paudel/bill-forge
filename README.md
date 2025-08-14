# Bill Report PDF Generator

A React application for generating professional PDF reports from bill data with image attachments.

## Features

- ✅ **Table-based PDF generation** with columns: Sr No, Bill Title, Date, Amount
- ✅ **Real-time sorting** by date (chronological order)
- ✅ **Editable bill data** - add, edit, and delete bills
- ✅ **Report customization** - custom title and date range display
- ✅ **Total calculation** automatically displayed at the end
- ✅ **Image attachments** - select and reorder images from a folder
- ✅ **Drag-and-drop reordering** for selected images
- ✅ **Responsive design** with modern UI

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your images (optional):**
   - Simply place image files directly in `/public/images/` folder
   - The app automatically detects and displays available images
   - Supported naming patterns: `receipt1.jpg`, `invoice1.png`, `bill1.pdf`, `document1.jpeg`, `image1.png`, `attachment1.pdf`, etc.
   - Supported formats: JPG, JPEG, PNG, PDF
   - No code changes needed - just drop images in the folder!

3. **Start the application:**
   ```bash
   npm start
   ```

## How to Use

1. **Edit Bill Data:**
   - Use the table to modify existing bills or click "Add New Bill"
   - Bills are automatically sorted by date in chronological order
   - Delete unwanted bills using the Delete button

2. **Customize Report:**
   - Change the report title in the input field
   - Check "Show date range below title" to display the date range

3. **Generate PDF:**
   - Click "Generate PDF" button
   - Select images from the popup (optional)
   - Drag and reorder selected images
   - Click "Create PDF" to download your report

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
