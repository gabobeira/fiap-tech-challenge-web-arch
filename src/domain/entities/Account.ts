import { AccountData } from "@/types/Account.types";

export class Account {
  private readonly fullName: string;
  private readonly firstName: string;
  private readonly balance: number;
  private readonly currency: string;

  constructor(data: AccountData) {
    this.fullName = data.fullName;
    this.firstName = data.firstName;
    this.balance = data.balance;
    this.currency = data.currency;
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
}
