from pydantic import BaseModel
from typing import List, Optional

class UserProfile(BaseModel):
    name: str
    cgpa: float
    budget_inr: float
    skills: List[str]
    interests: List[str]
    target_degree: str
    preferred_countries: List[str]
    work_experience_years: int = 0
    family_income_inr: float = 600000
    has_collateral: bool = False
    intake_year: int = 2026

class ROIRequest(BaseModel):
    profile: UserProfile
    country: str
    tuition_inr: float

class LoanRequest(BaseModel):
    profile: UserProfile
    loan_amount_inr: float

class ChatMessage(BaseModel):
    role: str    # "user" or "model"
    parts: List[str]

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_context: Optional[dict] = {}