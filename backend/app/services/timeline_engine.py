from app.models.schemas import UserProfile

def generate_timeline(profile: UserProfile):
    y  = profile.intake_year
    py = y - 1

    steps = [
        {"month": f"Jan {py}",       "task": "Profile Assessment & Shortlisting", "detail": "Finalise 8–10 target universities. Use PathwayAI Career Navigator.", "category": "planning",     "priority": "high"},
        {"month": f"Feb {py}",       "task": "GRE / GMAT Registration",            "detail": "Register for your exam. Budget ₹22,500 for GRE. Target 315+ score.", "category": "exam",         "priority": "high"},
        {"month": f"Mar–Apr {py}",   "task": "Exam Preparation",                   "detail": "6–8 weeks of focused prep. Apps: Magoosh, Manhattan Prep, Khan Academy.", "category": "exam",     "priority": "high"},
        {"month": f"May {py}",       "task": "Appear for GRE / GMAT + IELTS",      "detail": "Attempt both in same month. IELTS target: 7.0+. GRE target: 315+.", "category": "exam",         "priority": "high"},
        {"month": f"Jun {py}",       "task": "SOP & Resume Drafting",              "detail": "Draft Statement of Purpose. Tailor to each university's program goals.", "category": "documents",  "priority": "high"},
        {"month": f"Jul {py}",       "task": "Request Letters of Recommendation",  "detail": "Approach 3 professors/managers. Give them 6 weeks lead time.", "category": "documents",          "priority": "high"},
        {"month": f"Aug {py}",       "task": "Loan Pre-Application 🏦",            "detail": f"Apply to Poonawalla Fincorp. Target pre-approval for ₹{int(profile.budget_inr * 0.8 / 100000)}L.", "category": "finance", "priority": "high"},
        {"month": f"Sep–Oct {py}",   "task": "Submit Applications — Round 1",      "detail": "Submit to top 3 reach schools. Ensure SOP, transcripts, LORs are ready.", "category": "application", "priority": "high"},
        {"month": f"Nov {py}",       "task": "Submit Applications — Round 2",      "detail": "Submit to 3 match + 2 safety schools. Track deadlines carefully.", "category": "application",    "priority": "medium"},
        {"month": f"Dec {py}–Jan {y}","task": "Await Decisions + Interview Prep",  "detail": "Prepare for Skype interviews. Research faculty, program strengths.", "category": "application",  "priority": "medium"},
        {"month": f"Feb {y}",        "task": "Accept Offer & Request I-20 / CAS",  "detail": "Pay seat deposit. Request I-20 from university for visa application.", "category": "visa",        "priority": "high"},
        {"month": f"Mar {y}",        "task": "Visa Application Filing",            "detail": "Book DS-160 / Visa appointment. Gather all financial documents.", "category": "visa",           "priority": "high"},
        {"month": f"Apr {y}",        "task": "Loan Disbursement 💰",               "detail": "Submit I-20 to Poonawalla Fincorp. Loan disbursed in 7 working days.", "category": "finance",    "priority": "high"},
        {"month": f"May {y}",        "task": "Visa Interview",                     "detail": "Attend embassy appointment. Carry offer letter, I-20, loan sanction letter.", "category": "visa", "priority": "high"},
        {"month": f"Jul {y}",        "task": "Pre-Departure Prep",                 "detail": "Book flights, accommodation, forex card. Attend pre-departure briefing.", "category": "departure", "priority": "medium"},
        {"month": f"Aug {y}",        "task": "Fly & Enroll 🎓",                   "detail": "Arrive early for orientation. Congratulations — you made it!", "category": "departure",         "priority": "high"},
    ]

    return {
        "timeline":      steps,
        "total_steps":   len(steps),
        "intake_year":   y,
        "target_degree": profile.target_degree,
        "name":          profile.name,
    }