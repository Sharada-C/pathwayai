from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import career, roi, loan, timeline, chat

app = FastAPI(title="PathwayAI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Tighten after hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(career.router,   prefix="/api/career",   tags=["Career"])
app.include_router(roi.router,      prefix="/api/roi",      tags=["ROI"])
app.include_router(loan.router,     prefix="/api/loan",     tags=["Loan"])
app.include_router(timeline.router, prefix="/api/timeline", tags=["Timeline"])
app.include_router(chat.router,     prefix="/api/chat",     tags=["Chat"])

@app.get("/")
def root():
    return {"status": "PathwayAI API is live 🚀", "docs": "/docs"}