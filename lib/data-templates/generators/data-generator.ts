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
  static generateIncome(user: any, profileTemplate: any) {
    let baseIncome = 0;

    // Use user's incomePattern if available, otherwise fall back to template
    if (user.incomePattern) {
      // Parse income pattern to extract numerical ranges
      const incomeMatch = user.incomePattern.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
      if (incomeMatch) {
        const min = parseInt(incomeMatch[1].replace(/,/g, ''));
        const max = parseInt(incomeMatch[2].replace(/,/g, ''));
        baseIncome = this.randomInRange(min, max);
      } else {
        // Fallback to template if parsing fails
        baseIncome = this.randomInRange(profileTemplate.income.monthly_range[0], profileTemplate.income.monthly_range[1]);
      }
    } else {
      baseIncome = this.randomInRange(profileTemplate.income.monthly_range[0], profileTemplate.income.monthly_range[1]);
    }

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

  // 4. Generate bank accounts based on user selection and details
  static generateBankAccounts(user: any, selectedBanks: string[], profileType: string, profileTemplate: any) {
    const banks: { [key: string]: any } = {};

    selectedBanks.forEach(bankName => {
      const userBankDetails = user.accountDetails?.[bankName] || {};

      banks[bankName] = {
        savings_account: this.generateSavingsAccount(userBankDetails.savings, profileTemplate),
        salary_account: this.generateSalaryAccount(userBankDetails.salary, profileTemplate),
        credit_card: this.generateCreditCard(userBankDetails.creditCard, profileTemplate),
        // Add appropriate loan based on user data or profile
        loans: this.generateLoans(user, profileTemplate),
        investments: this.generateInvestments(userBankDetails.investment, profileTemplate)
      };
    });

    return banks;
  }

  // Generate savings account based on user details
  static generateSavingsAccount(userSavings: any, profileTemplate: any) {
    if (userSavings?.balance) {
      // Parse balance range and pick a value
      const balanceRange = userSavings.balance.split('-').map((s: string) => parseInt(s.replace(/,/g, '')));
      const balance = balanceRange.length === 2 ? this.randomInRange(balanceRange[0], balanceRange[1]) : parseInt(userSavings.balance.replace(/,/g, ''));

      return {
        balance: balance,
        interest_rate: userSavings.interest ? parseFloat(userSavings.interest.replace('%', '')) : 3.5,
        use: userSavings.use || 'Savings',
        description: userSavings.description || 'Primary Savings Account'
      };
    } else {
      // Fallback to template
      return {
        balance: this.randomInRange(bankAccountTemplates.savings_account.balance_range[0], bankAccountTemplates.savings_account.balance_range[1]),
        interest_rate: 3.5,
        use: 'Savings',
        description: 'Primary Savings Account'
      };
    }
  }

  // Generate salary account based on user details
  static generateSalaryAccount(userSalary: any, profileTemplate: any) {
    if (userSalary?.balance) {
      const balanceRange = userSalary.balance.split('-').map((s: string) => parseInt(s.replace(/,/g, '')));
      const balance = balanceRange.length === 2 ? this.randomInRange(balanceRange[0], balanceRange[1]) : parseInt(userSalary.balance.replace(/,/g, ''));

      return {
        balance: balance,
        transactions: userSalary.transactions ? parseInt(userSalary.transactions.split('-')[0]) : this.randomInRange(10, 50),
        description: userSalary.description || 'Primary Salary Account'
      };
    } else {
      return {
        balance: this.randomInRange(bankAccountTemplates.salary_account.balance_range[0], bankAccountTemplates.salary_account.balance_range[1]),
        transactions: this.randomInRange(10, 50),
        description: 'Primary Salary Account'
      };
    }
  }

  // Generate credit card based on user details
  static generateCreditCard(userCreditCard: any, profileTemplate: any) {
    if (userCreditCard?.limit) {
      const limitRange = userCreditCard.limit.split('-').map((s: string) => parseInt(s.replace(/,/g, '')));
      const limit = limitRange.length === 2 ? this.randomInRange(limitRange[0], limitRange[1]) : parseInt(userCreditCard.limit.replace(/,/g, ''));

      let balance = 0;
      if (userCreditCard.balance) {
        if (userCreditCard.balance === '0') {
          balance = 0;
        } else {
          const balanceRange = userCreditCard.balance.split('-').map((s: string) => parseInt(s.replace(/,/g, '')));
          balance = balanceRange.length === 2 ? this.randomInRange(balanceRange[0], balanceRange[1]) : parseInt(userCreditCard.balance.replace(/,/g, ''));
        }
      } else {
        balance = limit * 0.4; // Default utilization
      }

      return {
        limit: limit,
        current_balance: balance,
        utilization_rate: (balance / limit) * 100,
        use: userCreditCard.use || 'General Expenses',
        description: userCreditCard.description || 'Primary Credit Card'
      };
    } else {
      return {
        limit: this.randomInRange(bankAccountTemplates.credit_card.limit_range[0], bankAccountTemplates.credit_card.limit_range[1]),
        current_balance: this.randomInRange(bankAccountTemplates.credit_card.limit_range[0], bankAccountTemplates.credit_card.limit_range[1]) * 0.4,
        utilization_rate: 40,
        use: 'General Expenses',
        description: 'Primary Credit Card'
      };
    }
  }

  // 5. Generate appropriate loans based on user data or profile
  static generateLoans(user: any, profileTemplate: any) {
    const loans: { [key: string]: any } = {};

    // Check user debt information first
    if (user.debt && user.debt.type && user.debt.type !== 'No Outstanding Loan') {
      const debtType = user.debt.type.toLowerCase().replace(' ', '_');
      loans[debtType] = {
        principal: this.parseAmountRange(user.debt.amountRange),
        emi: this.parseAmountRange(user.debt.emiRange),
        remaining_years: this.parseDurationRange(user.debt.remaining),
        type: user.debt.type,
        description: `${user.debt.type} for user`
      };
    } else if (profileTemplate.debts && profileTemplate.debts.education_loan) {
      // Fallback to profile template
      loans.education_loan = {
        principal: this.randomInRange(profileTemplate.debts.education_loan.principal_range[0], profileTemplate.debts.education_loan.principal_range[1]),
        emi: this.randomInRange(8000, 12000),
        remaining_years: this.randomInRange(profileTemplate.debts.education_loan.remaining_years[0], profileTemplate.debts.education_loan.remaining_years[1])
      };
    }

    // Check user bank loan details
    if (user.accountDetails) {
      Object.values(user.accountDetails).forEach((bankDetail: any) => {
        if (bankDetail.loan && bankDetail.loan.type && bankDetail.loan.type !== '') {
          const loanKey = bankDetail.loan.type.toLowerCase().replace(' ', '_');
          loans[loanKey] = {
            principal: this.parseAmountRange(bankDetail.loan.amount),
            emi: this.parseAmountRange(bankDetail.loan.emi),
            remaining_years: this.parseDurationRange(bankDetail.loan.tenure),
            type: bankDetail.loan.type,
            description: bankDetail.loan.description || `${bankDetail.loan.type}`
          };
        }
      });
    }

    return loans;
  }

  // 5.5. Generate investments based on user data or profile
  static generateInvestments(userInvestment: any, profileTemplate: any) {
    const investments: { [key: string]: number } = {};

    if (userInvestment) {
      // Use user investment details
      if (userInvestment.mutualFunds && userInvestment.mutualFunds !== '') {
        investments.mutual_funds = this.parseAmountRange(userInvestment.mutualFunds);
      }
      if (userInvestment.stocks && userInvestment.stocks !== '') {
        investments.stocks = this.parseAmountRange(userInvestment.stocks);
      }
      if (userInvestment.fixedDeposits && userInvestment.fixedDeposits !== '') {
        investments.fixed_deposits = this.parseAmountRange(userInvestment.fixedDeposits);
      }
    } else if (profileTemplate.investments) {
      // Fallback to profile template
      Object.keys(profileTemplate.investments).forEach(type => {
        const range = profileTemplate.investments[type].range;
        investments[type] = this.randomInRange(range[0], range[1]);
      });
    }

    return investments;
  }

  // Helper method to parse amount ranges like "1,00,000-5,00,000"
  static parseAmountRange(rangeStr: string): number {
    if (!rangeStr || rangeStr === '') return 0;

    const parts = rangeStr.split('-').map(s => parseInt(s.replace(/,/g, '').trim()));
    if (parts.length === 2) {
      return this.randomInRange(parts[0], parts[1]);
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  }

  // Helper method to parse duration ranges like "1-5"
  static parseDurationRange(rangeStr: string): number {
    if (!rangeStr || rangeStr === '') return 0;

    const parts = rangeStr.split('-').map(s => parseInt(s.trim()));
    if (parts.length === 2) {
      return this.randomInRange(parts[0], parts[1]);
    } else if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  }

  // 6. Main function to generate complete financial data
  static generateFinancialData(user: any, selectedBanks: string[]) {
    const profileType = user.financialProfileType || 'young_professional';
    const profileTemplate = this.getProfileTemplate(profileType);

    const income = this.generateIncome(user, profileTemplate);
    const expenses = this.generateExpenses(profileTemplate, income.monthly);
    const banks = this.generateBankAccounts(user, selectedBanks, profileType, profileTemplate);

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
      totalAssets += bank.investments?.fixed_deposits || 0;

      totalLiabilities += bank.credit_card.current_balance;
      totalLiabilities += Object.values(bank.loans || {}).reduce((sum: number, loan: any) => sum + (loan.principal || 0), 0);
    });

    return totalAssets - totalLiabilities;
  }
}
