import config from './config.js';

export async function getSummary(text, age) {
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
                content: `You are an AI assistant to summarize long texts. Summarize this text into 2-3 meaningful sentences that would be understood by a ${age}-year-old reader. Text: ${text}`
            }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}