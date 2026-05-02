from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.services.chat_service import get_chat_response

router = APIRouter()

class ChatMessage(BaseModel):
    role: str # This will accept 'user' or 'assistant' from your frontend
    parts: List[str]

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_context: Optional[dict] = None

@router.post("/message")
async def chat(req: ChatRequest):
    # Fix: Map 'assistant' (from frontend) to 'model' (Gemini requirement)
    messages_list = [
        {"role": "model" if m.role == "assistant" else m.role, "parts": m.parts}
        for m in req.messages
    ]
    
    reply = get_chat_response(messages_list, req.user_context)
    return {"reply": reply}