const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
  try {
    const { query } = JSON.parse(event.body);
    
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are MSBI.AI, an advanced AI assistant specifically trained for biological research and analysis. Provide detailed, accurate responses with scientific citations when available." },
          { role: "user", content: query }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.SITE_URL || 'http://localhost:8888',
          'X-Title': process.env.SITE_TITLE || 'MSBI.AI',
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: response.data.choices[0].message.content }),
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while processing your request.' })
    };
  }
};