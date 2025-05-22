import { AccountData, Investments } from "../types/AccountTypes";

export class Account {
  private readonly id: number;
  private readonly idUser: number;
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
    this.id = data.id;
    this.idUser = data.idUser;
    this.fullName = data.fullName;
    this.firstName = data.firstName;
    this.balance = data.balance;
    this.currency = data.currency;
    this.investments = data.investments;
  }

  getId(): number {
    return this.id;
  }

  getIdUser(): number {
    return this.idUser;
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
