export const bankAccountTemplates = {
  // Base ranges that get multiplied by profile multipliers
  savings_account: {
    balance_range: [25000, 200000],
    interest_rate: [3.0, 4.0],
    transaction_frequency: "medium"
  },
  
  salary_account: {
    balance_range: [50000, 300000],
    transaction_frequency: "high",
    primary_use: "income_deposits"
  },
  
  current_account: {
    balance_range: [80000, 300000],
    transaction_frequency: "very_high",
    primary_use: "business_transactions"
  },
  
  credit_card: {
    limit_range: [25000, 200000],
    utilization_rate: [0.3, 0.6],
    payment_behavior: "full_payment"
  },
  
  loans: {
    education: { 
      amount_range: [500000, 1200000], 
      emi_range: [8000, 15000],
      interest_rate: [8.0, 9.0]
    },
    home: { 
      amount_range: [2000000, 5000000], 
      emi_range: [20000, 45000],
      interest_rate: [7.5, 8.5]
    },
    personal: { 
      amount_range: [100000, 500000], 
      emi_range: [5000, 12000],
      interest_rate: [10.0, 12.0]
    },
    car: { 
      amount_range: [300000, 800000], 
      emi_range: [8000, 15000],
      interest_rate: [8.5, 10.0]
    },
    business: {
      amount_range: [500000, 2000000],
      emi_range: [15000, 35000],
      interest_rate: [10.0, 12.0]
    }
  },
  
  investments: {
    mutual_funds: { 
      range: [50000, 500000],
      equity_allocation: [0.6, 0.8]
    },
    stocks: { 
      range: [25000, 300000],
      diversification: [5, 15] // number of stocks
    },
    fixed_deposits: { 
      range: [100000, 1000000],
      tenure: [1, 5] // years
    },
    bonds: {
      range: [50000, 300000],
      types: ["government", "corporate"]
    }
  }
}

// Profile multipliers for bank amounts
export const profileMultipliers = {
  young_professional: {
    savings: 0.4,
    salary: 0.5,
    current: 0.6,
    credit_card: 0.3,
    investments: 0.3,
    loans: 0.8
  },
  established_investor: {
    savings: 0.8,
    salary: 0.9,
    current: 1.0,
    credit_card: 0.7,
    investments: 0.8,
    loans: 1.0
  },
  retirement_focused: {
    savings: 1.2,
    salary: 1.1,
    current: 1.3,
    credit_card: 1.0,
    investments: 1.5,
    loans: 0.6 // lower loan amounts
  }
}
