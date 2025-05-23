import { TransactionData, TransactionType } from "../types/TransactionTypes";

export class Transaction {
  private readonly id: string;
  private readonly date: string;
  private readonly value: number;
  private readonly currency: string;
  private readonly type: TransactionType;
  private readonly fileBase64: string;
  private readonly fileName: string;
  private readonly idAccount: number;

  constructor(data: TransactionData) {
    this.id = data.id;
    this.date = data.date;
    this.value = data.value;
    this.currency = data.currency;
    this.type = data.type;
    this.fileBase64 = data.fileBase64 ?? "";
    this.fileName = data.fileName ?? "";
    this.idAccount = data.idAccount;
  }

  getId(): string {
    return this.id;
  }

  getDate(): string {
    return this.date;
  }

  getValue(): number {
    return this.value;
  }

  getCurrency(): string {
    return this.currency;
  }

  getType(): TransactionType {
    return this.type;
  }

  getFileBase64(): string {
    return this.fileBase64;
  }

  getFileName(): string {
    return this.fileName;
  }
  getIdAccount(): number {
    return this.idAccount;
  }
}
