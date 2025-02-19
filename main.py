import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

# Load environment variables from a .env file
load_dotenv()

# Get the API key from environment variables
DEEPSEEK_R1_API_KEY = os.getenv("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")
if not DEEPSEEK_R1_API_KEY:
    raise Exception("Deepseek API key is not set in the environment!")

app = FastAPI()

# Enable CORS so your front-end can call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict this in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI!"}

class ChatRequest(BaseModel):
    message: str

DEEPSEEK_R1_URL = "https://api.deepseek.ai/v1/query"  # Replace with the actual endpoint

async def query_deepseek(message: str) -> dict:
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_R1_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"query": message}  # Adjust this according to Deepseek docs

    async with httpx.AsyncClient() as client:
        response = await client.post(DEEPSEEK_R1_URL, json=payload, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    result = await query_deepseek(request.message)
    return result
