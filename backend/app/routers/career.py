from fastapi import APIRouter
from app.models.schemas import UserProfile
from app.services.career_engine import get_career_recommendations

router = APIRouter()

@router.post("/recommend")
def recommend(profile: UserProfile):
    results = get_career_recommendations(profile)
    return {"recommendations": results, "total": len(results)}