export interface User {
  financialProfileType?: string;
  selectedBanks?: string[];
  incomePattern?: string;
  accountDetails?: { [bankName: string]: BankDetails };
  debt?: {
    type: string;
    amountRange: string;
    emiRange: string;
    remaining: string;
  };
}

export interface BankDetails {
  savings?: SavingsAccountDetails;
  salary?: SalaryAccountDetails;
  creditCard?: CreditCardDetails;
  loan?: LoanDetails;
  investment?: InvestmentDetails;
}

export interface SavingsAccountDetails {
  balance: string;
  interest?: string;
  use?: string;
  description?: string;
}

export interface SalaryAccountDetails {
  balance: string;
  transactions?: string;
  description?: string;
}

export interface CreditCardDetails {
  limit: string;
  balance?: string;
  use?: string;
  description?: string;
}

export interface LoanDetails {
  type: string;
  amount: string;
  emi: string;
  tenure: string;
  description?: string;
}

export interface InvestmentDetails {
  mutualFunds?: string;
  stocks?: string;
  fixedDeposits?: string;
}

export interface ProfileTemplate {
  profile: {
    name: string;
    description: string;
    type?: string;
    age_range?: number[];
    risk_tolerance?: string;
    financial_focus?: string[];
    employment_type?: string;
  };
  income: {
    monthly_range: number[];
    sources: string[];
    variability: string;
    seasonal_pattern?: { high_months: number[]; low_months: number[]; stable_months?: string };
    growth_rate?: number;
  };
  expenses: { [key: string]: any };
  investments?: { [key: string]: any };
  debts?: any;
  assets?: any;
  financial_goals?: any;
  retirement_planning?: any;
}

export interface IncomeData {
  monthly: number;
  sources: string[];
  variability: string;
  monthly_history: number[];
}

export interface ExpensesData {
  [key: string]: number;
}

export interface BankAccount {
  savings_account: {
    balance: number;
    interest_rate: number;
    use: string;
    description: string;
  };
  salary_account: {
    balance: number;
    transactions: number;
    description: string;
  };
  credit_card: {
    limit: number;
    current_balance: number;
    utilization_rate: number;
    use: string;
    description: string;
  };
  loans: { [key: string]: Loan };
  investments: { [key: string]: number };
}

export interface Loan {
  principal: number;
  emi: number;
  remaining_years: number;
  type?: string;
  description?: string;
}

export interface FinancialData {
  profile: {
    name: string;
    description: string;
  };
  income: IncomeData;
  expenses: ExpensesData;
  banks: { [key: string]: BankAccount };
  summary: {
    total_income: number;
    total_expenses: number;
    monthly_savings: number;
    savings_rate: number;
    net_worth: number;
  };
  generated_at: string;
}

export interface TaxSlab {
  slab: string;
  rate: number;
  tax: number;
}

export interface TaxData {
  totalIncome: number;
  deductibleExpenses: number;
  taxSlabs: TaxSlab[];
  totalTax: number;
  quarterlyTax: number;
}

export interface Nudge {
  id: number;
  title: string;
  category: string;
  description: string;
  icon?: string;
  color?: string;
}
