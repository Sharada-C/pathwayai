import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib, os

np.random.seed(42)
n = 2000

# Synthetic training data
data = pd.DataFrame({
    "cgpa":            np.random.uniform(5.0, 10.0, n),
    "family_income":   np.random.uniform(200000, 2000000, n),
    "loan_amount":     np.random.uniform(500000, 5000000, n),
    "has_collateral":  np.random.randint(0, 2, n),
    "work_exp_years":  np.random.randint(0, 5, n),
    "course_duration": np.random.choice([1, 2], n),
})

# Approval logic (rule-based labels for training)
def approval(row):
    score = 0
    if row.cgpa >= 7.5: score += 2
    if row.family_income >= 600000: score += 2
    if row.loan_amount <= 3000000: score += 2
    if row.has_collateral == 1: score += 3
    if row.work_exp_years >= 1: score += 1
    return 1 if score >= 5 else 0

data["approved"] = data.apply(approval, axis=1)

X = data.drop("approved", axis=1)
y = data["approved"]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

os.makedirs("app/ml", exist_ok=True)
joblib.dump(model, "app/ml/loan_model.pkl")
print("✅ Loan model trained and saved.")