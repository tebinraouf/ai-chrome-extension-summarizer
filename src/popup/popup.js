import config from '/src/config.js';
import { getSummary } from '../api.js';

const ageSlider = document.getElementById('age-slider');
const ageValue = document.getElementById('age-value');

ageSlider.addEventListener('input', () => {
    ageValue.textContent = ageSlider.value;
});

document.getElementById('summarize-btn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const age = ageSlider.value;
    
    const response = await chrome.tabs.sendMessage(tab.id, { action: "getPageContent" });
    const result = response.content;

    const summaryResult = document.getElementById('summary-result');
    summaryResult.textContent = 'Summarizing...';

    try {
        const summary = await getSummary(result, age);
        summaryResult.textContent = summary;
    } catch (error) {
        summaryResult.textContent = 'Error generating summary. Please try again.';
        console.error(error);
    }
});