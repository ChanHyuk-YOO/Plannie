const axios = require('axios');

async function getOpenAIResponse(userRequest) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: "ft:gpt-4o-mini-2024-07-18:personal:chanhyukbot:BBbVXd3Z",
            messages: [{ role: "user", content: userRequest }],
            temperature: 0.5 // 필요에 따라 설정
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data.choices[0].message.content;
}

module.exports = { getOpenAIResponse };
