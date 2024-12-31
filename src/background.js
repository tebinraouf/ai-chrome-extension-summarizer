import config from '/src/config.js';

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
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.GROK_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [{
                        role: "user",
                        content: `You are an AI assistant to summarize long texts. Summarize this text into 2-3 meaningful sentences. Text: ${selectedText}`
                    }]
                })
            });

            const data = await response.json();
            const summary = data.choices[0].message.content;
            
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