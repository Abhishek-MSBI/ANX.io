const { SageMakerRuntimeClient, InvokeEndpointCommand } = require("@aws-sdk/client-sagemaker-runtime");
require('dotenv').config();

const client = new SageMakerRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { query } = JSON.parse(event.body);
    
    const input = {
      EndpointName: process.env.SAGEMAKER_ENDPOINT,
      ContentType: "application/json",
      Body: JSON.stringify({
        inputs: query,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          system_prompt: "You are MSBI.AI, an advanced bioscience research assistant. Provide detailed, accurate responses with scientific citations."
        }
      })
    };

    const command = new InvokeEndpointCommand(input);
    const response = await client.send(command);
    const result = JSON.parse(Buffer.from(response.Body).toString());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ answer: result.generated_text })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};