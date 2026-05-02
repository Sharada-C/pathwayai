from pydantic import BaseModel
from typing import Optional

class UserProfile(BaseModel):
    name: str
    cgpa: float                        # e.g. 7.8
    budget_inr: float                  # e.g. 3000000 (₹30L)
    skills: list[str]                  # ["Python", "ML", "DSA"]
    interests: list[str]               # ["AI", "Data Science"]
    target_degree: str                 # "MS", "MBA", "MTech"
    preferred_countries: list[str]     # ["USA", "Canada", "Germany"]
    work_experience_years: int = 0
    family_income_inr: float = 600000  # Annual income
    has_collateral: bool = False
    intake_year: int = 2026