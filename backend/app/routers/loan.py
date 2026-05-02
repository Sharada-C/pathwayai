from fastapi import APIRouter
from app.models.schemas import LoanRequest
from app.services.loan_engine import get_loan_prediction

router = APIRouter()

@router.post("/predict")
def predict(req: LoanRequest):
    return get_loan_prediction(req.profile, req.loan_amount_inr)