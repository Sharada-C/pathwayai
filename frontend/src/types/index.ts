export interface UserProfile {
  name: string
  cgpa: number
  budget_inr: number
  skills: string[]
  interests: string[]
  target_degree: string
  preferred_countries: string[]
  work_experience_years: number
  family_income_inr: number
  has_collateral: boolean
  intake_year: number
}

export interface University {
  name: string
  country: string
  program: string
  avg_fees_inr: number
  min_cgpa: number
  avg_salary_inr: number
  fit_score: number
  acceptance_rate: number
  ranking: number
  intake: string
  specializations: string[]
}

export interface ROIData {
  total_cost_inr: number
  total_investment_inr: number
  expected_salary_inr: number
  payback_years: number
  roi_5yr_percent: number
  loan_amount_inr: number
  living_cost_inr: number
  tuition_inr: number
  verdict: string
  country: string
}

export interface LoanData {
  approval_probability: number
  approved: boolean
  suggested_loan_inr: number
  max_eligible_inr: number
  emi_7yr: number
  emi_10yr: number
  interest_rate: number
  recommendation: string
}

export interface TimelineStep {
  month: string
  task: string
  detail: string
  category: string
  priority: string
}