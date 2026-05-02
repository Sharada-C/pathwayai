import os, joblib, numpy as np
from app.models.schemas import UserProfile

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../ml/loan_model.pkl")

def _train_and_save():
    """Train loan model on first run if .pkl doesn't exist."""
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier

    np.random.seed(42)
    n = 3000
    df = pd.DataFrame({
        "cgpa":            np.random.uniform(5.0, 10.0, n),
        "family_income":   np.random.uniform(200000, 2000000, n),
        "loan_amount":     np.random.uniform(500000, 5000000, n),
        "has_collateral":  np.random.randint(0, 2, n),
        "work_exp_years":  np.random.randint(0, 6, n),
        "course_duration": np.random.choice([1, 2], n),
    })

    def label(r):
        s = 0
        if r.cgpa >= 7.5:               s += 2
        if r.family_income >= 600000:   s += 2
        if r.loan_amount <= 3000000:    s += 2
        if r.has_collateral == 1:       s += 3
        if r.work_exp_years >= 1:       s += 1
        return 1 if s >= 5 else 0

    df["approved"] = df.apply(label, axis=1)
    model = RandomForestClassifier(n_estimators=150, random_state=42)
    model.fit(df.drop("approved", axis=1), df["approved"])
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    return model

def _load_model():
    if not os.path.exists(MODEL_PATH):
        return _train_and_save()
    return joblib.load(MODEL_PATH)

def get_loan_prediction(profile: UserProfile, loan_amount_inr: float):
    model = _load_model()

    X = np.array([[
        profile.cgpa,
        profile.family_income_inr,
        loan_amount_inr,
        int(profile.has_collateral),
        profile.work_experience_years,
        2,
    ]])

    proba = model.predict_proba(X)[0][1]

    max_loan = min(profile.family_income_inr * 10, 7500000)
    if profile.has_collateral:
        max_loan = min(max_loan * 1.3, 10000000)

    emi_7yr  = round((loan_amount_inr * (1 + 0.105)) / (7 * 12))
    emi_10yr = round((loan_amount_inr * (1 + 0.105)) / (10 * 12))

    return {
        "approval_probability": round(proba * 100, 1),
        "approved":             bool(proba >= 0.5),
        "suggested_loan_inr":   round(min(loan_amount_inr, max_loan)),
        "max_eligible_inr":     round(max_loan),
        "emi_7yr":              emi_7yr,
        "emi_10yr":             emi_10yr,
        "interest_rate":        10.5,
        "recommendation": (
            "Strong profile — apply with confidence 🟢"  if proba > 0.70 else
            "Good profile — consider adding collateral 🟡" if proba > 0.45 else
            "Add a co-applicant to strengthen your case 🔴"
        ),
    }