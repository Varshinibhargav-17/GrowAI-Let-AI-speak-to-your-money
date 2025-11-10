export const youngProfessionalTemplate = {
  profile: {
    name: "Young Professional",
    description: "Early career professional focused on building financial foundations",
    type: "young_professional",
    risk_tolerance: "medium_high",
    financial_focus: ["emergency_fund", "debt_repayment", "skill_investment"]
  },
  
  income: {
    monthly_range: [40000, 80000],
    variability: "high", // ±40%
    sources: ["freelance_projects", "gig_work"],
    seasonal_pattern: {
      high_months: [0, 1, 10, 11], // Jan, Feb, Oct, Nov
      low_months: [5, 6] // June, July
    }
  },
  
  expenses: {
    housing: { range: [15000, 22000], category: "essential" },
    food: { range: [6000, 9000], category: "essential" },
    transportation: { range: [4000, 7000], category: "essential" },
    entertainment: { range: [3000, 6000], category: "discretionary" },
    education_loan: { range: [8000, 12000], category: "debt" },
    professional_development: { range: [2000, 4000], category: "investment" }
  },
  
  debts: {
    education_loan: { 
      principal_range: [500000, 800000],
      interest_rate: 8.5,
      remaining_years: [3, 5]
    }
  },
  
  investments: {
    emergency_fund: { range: [80000, 150000] },
    mutual_funds: { range: [20000, 80000] },
    stocks: { range: [10000, 40000] }
  }
}