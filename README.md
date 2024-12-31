# AI Summarizer Chrome Extension

This project is a Chrome extension that uses AI to summarize web page content, with customizable reading age levels.

## Features

- Summarize entire web pages
- Summarize selected text via context menu
- Adjustable reading age level (8-60 years)
- Clean popup interface
- Real-time summaries using Groq's LLama3-70b model

## Project Structure

- `src/background.js`: Background script that handles events and messages
- `src/content.js`: Content script that interacts with web pages
- `src/api.js`: Handles API communication with Groq
- `src/popup/popup.html`: HTML structure for the popup interface
- `src/popup/popup.js`: JavaScript for handling popup interactions
- `src/popup/popup.css`: Styles for the popup
- `manifest.json`: Configuration file for the Chrome extension

## Configuration

1. Locate [src/config_sample.js](src/config_sample.js) in the project directory
2. Create a copy named `config.js` in the same directory
3. Open `config.js` and replace `'YOUR_API_KEY_HERE'` with your Groq API key
4. Save the file

Note: The `config.js` file is ignored by git (via .gitignore) for security purposes

## Installation

1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project directory

## Usage

### Popup Interface

1. Click the AI Summarizer icon in the Chrome toolbar to open the popup
2. Adjust the reading age using the slider
3. Click "Summarize Page" to get an AI-generated summary

### Context Menu

1. Select any text on a webpage
2. Right-click to open the context menu
3. Choose "Summarize Selection"
4. Select the reading age in the popup
5. View the generated summary in a floating window

## License

This project is licensed under the MIT License.
