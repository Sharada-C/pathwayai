from fastapi import APIRouter
from app.models.schemas import ROIRequest
from app.services.roi_engine import calculate_roi

router = APIRouter()

@router.post("/calculate")
def roi(req: ROIRequest):
    return calculate_roi(req.profile, req.country, req.tuition_inr)