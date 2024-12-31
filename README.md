# AI Summarizer Chrome Extension

This project is a Chrome extension that uses AI to summarize web page content.

## Project Structure

- `src/background.js`: Background script that handles events and messages.
- `src/content.js`: Content script that interacts with web pages.
- `src/popup/popup.html`: HTML structure for the popup interface.
- `src/popup/popup.js`: JavaScript for handling popup interactions.
- `src/popup/popup.css`: Styles for the popup.
- `manifest.json`: Configuration file for the Chrome extension.

## Configuration

1. Locate [src/config_sample.js](src/config_sample.js) in the project directory
2. Create a copy named `config.js` in the same directory
3. Open `config.js` and replace `'YOUR_API_KEY_HERE'` with your Grok API key
4. Save the file

Note: The `config.js` file is ignored by git (via .gitignore) for security purposes

## Installation

1. Clone the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the project directory.

## Usage

Click the AI Summarizer icon in the Chrome toolbar to open the popup. Press the "Summarize Page" button to get an AI-generated summary of the current webpage.

## License

This project is licensed under the MIT License.
