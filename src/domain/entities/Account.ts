import { AccountData, Investments } from "../types/AccountTypes";

export class Account {
  private readonly fullName: string;
  private readonly firstName: string;
  private readonly balance: number;
  private readonly currency: string;
  private readonly investments: {
    readonly total: number;
    readonly fixed: number;
    readonly variable: number;
  };

  constructor(data: AccountData) {
    this.fullName = data.fullName;
    this.firstName = data.firstName;
    this.balance = data.balance;
    this.currency = data.currency;
    this.investments = data.investments;
  }

  getFullName(): string {
    return this.fullName;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getBalance(): number {
    return this.balance;
  }

  getCurrency(): string {
    return this.currency;
  }

  getInvestments(): Investments {
    return this.investments;
  }
}
