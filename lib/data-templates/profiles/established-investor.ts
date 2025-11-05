export const establishedInvestorTemplate = {
  profile: {
    type: "established_investor",
    age_range: [35, 50],
    risk_tolerance: "medium",
    financial_focus: ["wealth_accumulation", "tax_optimization", "portfolio_diversification"],
    employment_type: "consultant_business_owner"
  },
  
  income: {
    monthly_range: [120000, 250000],
    variability: "medium", // ±20% monthly fluctuations
    sources: ["consulting_projects", "retainer_clients", "business_revenue"],
    seasonal_pattern: {
      high_months: [0, 1, 2, 9, 10, 11], // Q1 and Q4
      low_months: [6, 7] // July, August
    },
    growth_rate: 0.10 // 10% annual income growth
  },
  
  expenses: {
    // Essential Expenses
    housing: { range: [30000, 50000], category: "essential", variability: "low" },
    utilities: { range: [6000, 10000], category: "essential", variability: "low" },
    food: { range: [12000, 18000], category: "essential", variability: "medium" },
    transportation: { range: [10000, 15000], category: "essential", variability: "medium" },
    
    // Family Expenses
    children_education: { range: [15000, 25000], category: "essential", variability: "low" },
    family_insurance: { range: [8000, 12000], category: "essential", variability: "none" },
    
    // Business Expenses
    professional_services: { range: [10000, 20000], category: "business", variability: "medium" },
    office_space: { range: [15000, 25000], category: "business", variability: "low" },
    team_salaries: { range: [30000, 60000], category: "business", variability: "low" },
    
    // Lifestyle
    entertainment_travel: { range: [15000, 25000], category: "discretionary", variability: "high" },
    investments_taxes: { range: [20000, 40000], category: "financial", variability: "medium" }
  },
  
  debts: {
    home_loan: { 
      principal_range: [3000000, 5000000],
      interest_rate: [7.5, 8.5],
      remaining_years: [10, 15],
      emi_range: [30000, 50000]
    },
    business_loan: {
      principal_range: [500000, 1500000],
      interest_rate: [10.0, 12.0],
      emi_range: [15000, 30000]
    },
    credit_cards: {
      total_limit: [200000, 400000],
      utilization_rate: [0.2, 0.4], // 20-40% of limit used
      payment_behavior: "always_pays_full"
    }
  },
  
  investments: {
    equity_portfolio: { 
      range: [800000, 2000000],
      monthly_contribution: [15000, 30000],
      allocation: [0.5, 0.6] // 50-60% in equity
    },
    mutual_funds: { 
      range: [500000, 1500000],
      sip_range: [10000, 25000],
      types: ["large_cap", "flexi_cap", "sectoral"]
    },
    real_estate: {
      range: [2000000, 5000000],
      rental_income: [15000, 30000]
    },
    fixed_income: {
      range: [500000, 1200000],
      types: ["fd", "debt_funds", "corporate_bonds"]
    },
    retirement_corpus: {
      range: [1000000, 3000000],
      monthly_contribution: [10000, 20000]
    }
  },
  
  assets: {
    primary_residence: { range: [5000000, 10000000] },
    vehicles: { range: [800000, 1500000] },
    business_equity: { range: [2000000, 5000000] },
    liquid_assets: { range: [500000, 1000000] }
  },
  
  financial_goals: {
    short_term: ["tax_optimization", "portfolio_rebalancing", "business_expansion"],
    medium_term: ["children_education_fund", "second_property", "international_travel"],
    long_term: ["retirement_corpus_5cr", "wealth_preservation", "legacy_planning"]
  }
}
