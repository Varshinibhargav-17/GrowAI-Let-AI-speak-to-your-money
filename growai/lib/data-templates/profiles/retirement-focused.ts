export const retirementFocusedTemplate = {
  profile: {
    name: "Retirement Focused",
    description: "Pre-retirement professional planning for financial independence and legacy",
    type: "retirement_focused",
    age_range: [50, 65],
    risk_tolerance: "conservative",
    financial_focus: ["wealth_preservation", "income_generation", "succession_planning"],
    employment_type: "business_owner_consultant"
  },
  
  income: {
    monthly_range: [150000, 300000],
    variability: "low", // ±15% monthly fluctuations
    sources: ["business_revenue", "investment_income", "rental_income", "consulting"],
    seasonal_pattern: {
      stable_months: "all", // More stable income pattern
      high_months: [2, 3, 10, 11], // March, April, Oct, Nov (festival seasons)
      low_months: [] // No low months for retirement focused
    },
    growth_rate: 0.05 // 5% annual income growth (conservative)
  },
  
  expenses: {
    // Essential Living Expenses
    healthcare: { range: [10000, 20000], category: "essential", variability: "medium" },
    housing_maintenance: { range: [8000, 15000], category: "essential", variability: "low" },
    utilities: { range: [8000, 12000], category: "essential", variability: "low" },
    food: { range: [10000, 15000], category: "essential", variability: "low" },
    
    // Family & Lifestyle
    family_support: { range: [10000, 20000], category: "essential", variability: "medium" },
    travel_leisure: { range: [15000, 25000], category: "discretionary", variability: "high" },
    insurance_premiums: { range: [15000, 25000], category: "essential", variability: "none" },
    
    // Business Expenses
    business_operations: { range: [50000, 100000], category: "business", variability: "medium" },
    professional_services: { range: [10000, 20000], category: "business", variability: "low" },
    
    // Financial
    tax_payments: { range: [25000, 50000], category: "financial", variability: "seasonal" }
  },
  
  debts: {
    home_loan: { 
      principal_range: [500000, 1500000], // Small remaining balance
      interest_rate: [7.0, 8.0],
      remaining_years: [3, 7],
      emi_range: [15000, 25000]
    },
    business_loan: {
      principal_range: [1000000, 3000000],
      interest_rate: [9.0, 11.0],
      emi_range: [30000, 50000]
    },
    credit_cards: {
      total_limit: [300000, 500000],
      utilization_rate: [0.1, 0.3], // 10-30% of limit used
      payment_behavior: "always_pays_full"
    }
  },
  
  investments: {
    retirement_corpus: { 
      range: [3000000, 8000000],
      monthly_withdrawal: [0, 0], // Not withdrawing yet
      allocation: [0.3, 0.4] // 30-40% in equity
    },
    fixed_income: { 
      range: [2000000, 5000000],
      monthly_income: [15000, 30000],
      types: ["senior_citizen_fd", "debt_funds", "bonds"]
    },
    real_estate: {
      range: [5000000, 15000000],
      rental_income: [20000, 50000],
      properties: [1, 2]
    },
    equity: {
      range: [1000000, 3000000],
      dividend_income: [5000, 15000],
      allocation: [0.2, 0.3] // 20-30% in equity
    },
    gold_commodities: {
      range: [500000, 1500000],
      allocation: [0.1, 0.15] // 10-15% in gold
    }
  },
  
  assets: {
    primary_residence: { range: [8000000, 15000000] },
    business_valuation: { range: [5000000, 20000000] },
    investment_properties: { range: [5000000, 10000000] },
    vehicles_assets: { range: [1000000, 2500000] },
    liquid_assets: { range: [1000000, 3000000] }
  },
  
  financial_goals: {
    short_term: ["healthcare_planning", "estate_documentation", "business_succession"],
    medium_term: ["retirement_transition", "asset_restructuring", "tax_efficiency"],
    long_term: ["wealth_transfer", "legacy_creation", "philanthropy"]
  },
  
  retirement_planning: {
    target_retirement_age: [60, 65],
    required_monthly_income: [80000, 120000],
    corpus_adequacy: [0.7, 0.9], // 70-90% of target corpus achieved
    succession_planning: ["family_member", "professional_manager", "business_sale"]
  }
}
