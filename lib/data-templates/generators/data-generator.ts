import { youngProfessionalTemplate } from '../profiles/young-professional';
import { establishedInvestorTemplate } from '../profiles/established-investor';
import { retirementFocusedTemplate } from '../profiles/retirement-focused';
import { bankAccountTemplates } from '../banks/bank-templates';

export class FinancialDataGenerator {
  // 1. Generate random number within range
  static randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 2. Generate user-specific income data
  static generateIncome(profileTemplate: any) {
    const baseIncome = this.randomInRange(profileTemplate.income.monthly_range[0], profileTemplate.income.monthly_range[1]);

    return {
      monthly: baseIncome,
      sources: profileTemplate.income.sources,
      variability: profileTemplate.income.variability,
      // Generate 12 months of income with variations
      monthly_history: Array.from({ length: 12 }, (_, i) => {
        const variation = profileTemplate.income.variability === 'high' ? 0.4 : 0.2;
        const variedIncome = baseIncome * (1 + (Math.random() * variation * 2 - variation));
        return Math.floor(variedIncome);
      })
    };
  }

  // 3. Generate expense breakdown
  static generateExpenses(profileTemplate: any, income: number) {
    const expenses: { [key: string]: number } = {};

    Object.keys(profileTemplate.expenses).forEach(category => {
      const range = profileTemplate.expenses[category].range;
      expenses[category] = this.randomInRange(range[0], range[1]);
    });

    return expenses;
  }

  // 4. Generate bank accounts based on selection
  static generateBankAccounts(selectedBanks: string[], profileType: string, profileTemplate: any) {
    const banks: { [key: string]: any } = {};

    selectedBanks.forEach(bankName => {
      banks[bankName] = {
        savings_account: {
          balance: this.randomInRange(bankAccountTemplates.savings_account.balance_range[0], bankAccountTemplates.savings_account.balance_range[1]),
          interest_rate: 3.5
        },
        salary_account: {
          balance: this.randomInRange(bankAccountTemplates.salary_account.balance_range[0], bankAccountTemplates.salary_account.balance_range[1])
        },
        credit_card: {
          limit: this.randomInRange(bankAccountTemplates.credit_card.limit_range[0], bankAccountTemplates.credit_card.limit_range[1]),
          current_balance: this.randomInRange(bankAccountTemplates.credit_card.limit_range[0], bankAccountTemplates.credit_card.limit_range[1]) * 0.4
        },
        // Add appropriate loan based on profile
        loans: this.generateLoans(profileTemplate),
        investments: this.generateInvestments(profileTemplate)
      };
    });

    return banks;
  }

  // 5. Generate appropriate loans based on profile
  static generateLoans(profileTemplate: any) {
    const loans: { [key: string]: any } = {};

    if (profileTemplate.debts && profileTemplate.debts.education_loan) {
      loans.education_loan = {
        principal: this.randomInRange(profileTemplate.debts.education_loan.principal_range[0], profileTemplate.debts.education_loan.principal_range[1]),
        emi: this.randomInRange(8000, 12000), // Default range for education loan EMI
        remaining_years: this.randomInRange(profileTemplate.debts.education_loan.remaining_years[0], profileTemplate.debts.education_loan.remaining_years[1])
      };
    }

    // Add other loan types based on profile
    return loans;
  }

  // 5.5. Generate investments based on profile
  static generateInvestments(profileTemplate: any) {
    const investments: { [key: string]: number } = {};

    if (profileTemplate.investments) {
      Object.keys(profileTemplate.investments).forEach(type => {
        const range = profileTemplate.investments[type].range;
        investments[type] = this.randomInRange(range[0], range[1]);
      });
    }

    return investments;
  }

  // 6. Main function to generate complete financial data
  static generateFinancialData(profileType: string, selectedBanks: string[]) {
    const profileTemplate = this.getProfileTemplate(profileType);

    const income = this.generateIncome(profileTemplate);
    const expenses = this.generateExpenses(profileTemplate, income.monthly);
    const banks = this.generateBankAccounts(selectedBanks, profileType, profileTemplate);

    // Calculate totals
    const totalExpenses = Object.values(expenses).reduce((sum: number, val: number) => sum + val, 0);
    const totalSavings = income.monthly - totalExpenses;

    return {
      profile: profileTemplate.profile,
      income,
      expenses,
      banks,
      summary: {
        total_income: income.monthly,
        total_expenses: totalExpenses,
        monthly_savings: totalSavings,
        savings_rate: (totalSavings / income.monthly) * 100,
        net_worth: this.calculateNetWorth(banks, profileTemplate)
      },
      generated_at: new Date().toISOString()
    };
  }

  // 7. Helper to get profile template
  static getProfileTemplate(profileType: string) {
    const templates: { [key: string]: any } = {
      'young_professional': youngProfessionalTemplate,
      'established_investor': establishedInvestorTemplate,
      'retirement_focused': retirementFocusedTemplate
    };
    return templates[profileType];
  }

  // 8. Calculate net worth from all accounts
  static calculateNetWorth(banks: any, profileTemplate: any) {
    let totalAssets = 0;
    let totalLiabilities = 0;

    Object.values(banks).forEach((bank: any) => {
      totalAssets += bank.savings_account.balance + bank.salary_account.balance;
      totalAssets += bank.investments?.mutual_funds || 0;
      totalAssets += bank.investments?.stocks || 0;

      totalLiabilities += bank.credit_card.current_balance;
      totalLiabilities += bank.loans?.education_loan?.principal || 0;
      totalLiabilities += bank.loans?.home_loan?.principal || 0;
    });

    return totalAssets - totalLiabilities;
  }
}
