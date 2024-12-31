chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageContent") {
        const pageContent = document.body.innerText;
        sendResponse({ content: pageContent });
    } else if (request.action === "showAgeSelector") {
        // Create age selector UI
        const selectorDiv = document.createElement('div');
        selectorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10000;
        `;
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '8';
        slider.max = '60';
        slider.value = '35';
        
        const ageLabel = document.createElement('span');
        ageLabel.textContent = `Reading age: ${slider.value}`;
        
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.style.marginLeft = '10px';
        
        slider.oninput = () => {
            ageLabel.textContent = `Reading age: ${slider.value}`;
        };
        
        confirmBtn.onclick = () => {
            chrome.runtime.sendMessage({
                action: "ageSelected",
                age: slider.value
            });
            selectorDiv.remove();
        };
        
        selectorDiv.appendChild(ageLabel);
        selectorDiv.appendChild(slider);
        selectorDiv.appendChild(confirmBtn);
        document.body.appendChild(selectorDiv);
    } else if (request.action === "showSummary") {
        // Create and show a floating div with the summary
        const summaryDiv = document.createElement('div');
        summaryDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 300px;
            padding: 15px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10000;
        `;
        
        summaryDiv.textContent = request.summary;
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 20px;
        `;
        closeButton.onclick = () => summaryDiv.remove();
        
        summaryDiv.appendChild(closeButton);
        document.body.appendChild(summaryDiv);
    }
});