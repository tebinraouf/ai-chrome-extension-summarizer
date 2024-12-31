import config from '/src/config.js';

document.getElementById('summarize-btn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Get page content through message passing
    const response = await chrome.tabs.sendMessage(tab.id, { action: "getPageContent" });
    const result = response.content;

    const summaryResult = document.getElementById('summary-result');
    summaryResult.textContent = 'Summarizing...';

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
                    content: `You are an AI assistant to summarize long texts. Summarize this text into 2-3 meaningful sentences. Text: ${result}`
                }]
            })
        });

        const data = await response.json();
        summaryResult.textContent = data.choices[0].message.content;
    } catch (error) {
        summaryResult.textContent = 'Error generating summary. Please try again.';
        console.error(error);
    }
});