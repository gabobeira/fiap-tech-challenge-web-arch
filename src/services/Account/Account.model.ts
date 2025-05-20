export interface AccountData {
  id: number;
  idUser: number;
  fullName: string;
  firstName: string;
  balance: number;
  currency: string;
}

export class Account {
  readonly id: number;
  readonly idUser: number;
  readonly fullName: string;
  readonly firstName: string;
  readonly balance: number;
  readonly currency: string;

  constructor(data: AccountData) {
    this.id = data.id;
    this.idUser = data.idUser;
    this.fullName = data.fullName;
    this.firstName = data.firstName;
    this.balance = data.balance;
    this.currency = data.currency;
  }
}
