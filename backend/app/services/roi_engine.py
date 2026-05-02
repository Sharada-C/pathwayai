from app.models.schemas import UserProfile

COUNTRY_SALARY_INR = {
    "USA":         14000000,
    "Canada":       9500000,
    "Germany":      7500000,
    "UK":           8000000,
    "Australia":    7200000,
    "Singapore":    8800000,
    "Switzerland": 12000000,
    "India":        2800000,
}

LIVING_COST_INR = {
    "USA":         1800000,
    "Canada":      1500000,
    "Germany":      900000,
    "UK":          1600000,
    "Australia":   1400000,
    "Singapore":   1600000,
    "Switzerland": 2200000,
    "India":        400000,
}

def calculate_roi(profile: UserProfile, country: str, tuition_inr: float):
    living   = LIVING_COST_INR.get(country, 1200000) * 2
    total    = tuition_inr + living
    loan_amt = total * 0.8
    interest = loan_amt * 0.105 * 2       # 10.5% p.a. × 2 years
    total_investment = total + interest

    salary = COUNTRY_SALARY_INR.get(country, 5000000)
    if profile.cgpa >= 8.5:
        salary *= 1.15
    elif profile.cgpa >= 7.5:
        salary *= 1.05

    annual_repayment = salary * 0.30
    payback_years    = round(total_investment / annual_repayment, 1)
    roi_5yr          = round(((salary * 5 - total_investment) / total_investment) * 100, 1)

    return {
        "total_cost_inr":        round(total),
        "total_investment_inr":  round(total_investment),
        "expected_salary_inr":   round(salary),
        "payback_years":         payback_years,
        "roi_5yr_percent":       roi_5yr,
        "loan_amount_inr":       round(loan_amt),
        "living_cost_inr":       round(living),
        "tuition_inr":           round(tuition_inr),
        "country":               country,
        "verdict": (
            "Excellent ROI — Highly Recommended ✅" if roi_5yr > 200 else
            "Good ROI — Worth Considering 👍"      if roi_5yr > 100 else
            "Moderate ROI — Plan Carefully ⚠️"
        ),
    }