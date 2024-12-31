// This file contains the background script for the Chrome extension.
// It handles events such as browser actions and messages from other parts of the extension.

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup/popup.html' });
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'someAction') {
        // Handle the action
        sendResponse({ status: 'success' });
    }
});