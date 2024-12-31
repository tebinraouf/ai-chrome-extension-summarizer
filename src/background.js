import config from '/src/config.js';
import { getSummary } from './api.js';

// This file contains the background script for the Chrome extension.
// It handles events such as browser actions and messages from other parts of the extension.
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'someAction') {
        // Handle the action
        sendResponse({ status: 'success' });
    }
});

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "summarizeSelection",
        title: "Summarize Selection",
        contexts: ["selection"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "summarizeSelection") {
        const selectedText = info.selectionText;
        
        try {
            // First, show the age selector UI
            await chrome.tabs.sendMessage(tab.id, {
                action: "showAgeSelector"
            });

            // Wait for age selection
            const age = await new Promise(resolve => {
                chrome.runtime.onMessage.addListener(function listener(request) {
                    if (request.action === "ageSelected") {
                        chrome.runtime.onMessage.removeListener(listener);
                        resolve(request.age);
                    }
                });
            });

            const summary = await getSummary(selectedText, age);
            
            // Send the summary to the content script
            chrome.tabs.sendMessage(tab.id, {
                action: "showSummary",
                summary: summary
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
});