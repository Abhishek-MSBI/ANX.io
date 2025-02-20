// netlify/functions/ask.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Parse the POST request body (expects a JSON object with a property "query")
    const { query } = JSON.parse(event.body);

    // Retrieve your API key from Netlify environment variables
    const apiKey = process.env.DEEPSEEK_R1_API_KEY;

    // Updated endpoint as per requirements:
    const deepSeekEndpoint = 'https://openrouter.ai/api/v1/chat/completions';

    // Call the DeepSeek API with the user's query
    const response = await axios.post(
      deepSeekEndpoint,
      {
        model: "deepseek/deepseek-chat:free", // Updated model name
        messages: [
          { role: "system", content: "You are MSBI.AI, an advanced AI assistant specifically trained for biological research and analysis. Provide detailed, accurate responses with scientific citations when available." },
          { role: "user", content: query }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the answer from the API response
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: response.data.choices[0].message.content }),
    };
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching the answer.' }),
    };
  }
};
