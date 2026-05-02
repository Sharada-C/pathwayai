from app.models.schemas import UserProfile

UNIVERSITY_DB = [
    {
        "name": "University of Toronto",
        "country": "Canada",
        "program": "MS Computer Science",
        "avg_fees_inr": 3200000,
        "min_cgpa": 7.5,
        "avg_salary_inr": 9500000,
        "specializations": ["AI", "Data Science", "Systems"],
        "intake": "Fall",
        "acceptance_rate": 15,
        "ranking": 18,
    },
    {
        "name": "TU Munich",
        "country": "Germany",
        "program": "MS Informatics",
        "avg_fees_inr": 800000,
        "min_cgpa": 7.0,
        "avg_salary_inr": 7500000,
        "specializations": ["AI", "Robotics", "ML"],
        "intake": "Winter",
        "acceptance_rate": 20,
        "ranking": 50,
    },
    {
        "name": "University of Waterloo",
        "country": "Canada",
        "program": "MASc Computer Engineering",
        "avg_fees_inr": 2800000,
        "min_cgpa": 7.8,
        "avg_salary_inr": 10000000,
        "specializations": ["Data Science", "Systems", "AI"],
        "intake": "Fall",
        "acceptance_rate": 18,
        "ranking": 149,
    },
    {
        "name": "NUS Singapore",
        "country": "Singapore",
        "program": "MS Computer Science",
        "avg_fees_inr": 2500000,
        "min_cgpa": 7.5,
        "avg_salary_inr": 8800000,
        "specializations": ["AI", "Data Science", "Security"],
        "intake": "August",
        "acceptance_rate": 22,
        "ranking": 8,
    },
    {
        "name": "IISc Bangalore",
        "country": "India",
        "program": "MTech AI & ML",
        "avg_fees_inr": 250000,
        "min_cgpa": 8.0,
        "avg_salary_inr": 2800000,
        "specializations": ["AI", "ML", "Research"],
        "intake": "July",
        "acceptance_rate": 5,
        "ranking": 155,
    },
    {
        "name": "Georgia Tech (OMSCS)",
        "country": "USA",
        "program": "MS Computer Science",
        "avg_fees_inr": 1800000,
        "min_cgpa": 7.5,
        "avg_salary_inr": 14000000,
        "specializations": ["ML", "AI", "Systems"],
        "intake": "Fall",
        "acceptance_rate": 30,
        "ranking": 33,
    },
    {
        "name": "ETH Zurich",
        "country": "Switzerland",
        "program": "MS Computer Science",
        "avg_fees_inr": 500000,
        "min_cgpa": 8.5,
        "avg_salary_inr": 12000000,
        "specializations": ["AI", "Distributed Systems", "ML"],
        "intake": "September",
        "acceptance_rate": 8,
        "ranking": 7,
    },
    {
        "name": "Monash University",
        "country": "Australia",
        "program": "Master of Data Science",
        "avg_fees_inr": 2200000,
        "min_cgpa": 6.5,
        "avg_salary_inr": 7200000,
        "specializations": ["Data Science", "AI", "Analytics"],
        "intake": "February",
        "acceptance_rate": 45,
        "ranking": 57,
    },
    {
        "name": "University of Edinburgh",
        "country": "UK",
        "program": "MS Artificial Intelligence",
        "avg_fees_inr": 3000000,
        "min_cgpa": 7.5,
        "avg_salary_inr": 8200000,
        "specializations": ["AI", "ML", "NLP"],
        "intake": "September",
        "acceptance_rate": 25,
        "ranking": 22,
    },
    {
        "name": "BITS Pilani",
        "country": "India",
        "program": "MTech Data Science",
        "avg_fees_inr": 900000,
        "min_cgpa": 7.0,
        "avg_salary_inr": 1800000,
        "specializations": ["Data Science", "AI", "Analytics"],
        "intake": "August",
        "acceptance_rate": 40,
        "ranking": 400,
    },
]


def calculate_fit_score(profile: UserProfile, uni: dict) -> float:
    score = 0.0

    # CGPA match (30 pts)
    diff = profile.cgpa - uni["min_cgpa"]
    if diff >= 0:
        score += min(30, 20 + diff * 5)
    else:
        score += max(0, 15 + diff * 10)

    # Budget match (25 pts)
    if profile.budget_inr >= uni["avg_fees_inr"]:
        score += 25
    else:
        score += (profile.budget_inr / uni["avg_fees_inr"]) * 20

    # Country preference (20 pts)
    if uni["country"] in profile.preferred_countries:
        score += 20

    # Specialization / interest match (25 pts)
    matched = sum(
        1 for spec in uni["specializations"]
        if any(i.lower() in spec.lower() for i in profile.interests)
    )
    score += min(25, matched * 10)

    return round(min(100, score), 1)


def get_career_recommendations(profile: UserProfile):
    scored = []
    for uni in UNIVERSITY_DB:
        fit = calculate_fit_score(profile, uni)
        if fit > 25:
            scored.append({**uni, "fit_score": fit})
    scored.sort(key=lambda x: x["fit_score"], reverse=True)
    return scored[:6]