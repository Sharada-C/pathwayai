from fastapi import APIRouter
from app.models.schemas import UserProfile
from app.services.timeline_engine import generate_timeline

router = APIRouter()

@router.post("/generate")
def timeline(profile: UserProfile):
    return generate_timeline(profile)