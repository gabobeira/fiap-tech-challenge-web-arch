import { TransactionData } from "@/types/Transaction.types";

export class Transaction {
  private readonly id: string;
  private readonly date: string;
  private readonly value: number;
  private readonly currency: string;
  private readonly type: string;
  private readonly fileBase64: string | null;
  private readonly fileName: string | null;

  constructor(data: TransactionData) {
    this.id = data.id;
    this.date = data.date;
    this.value = data.value;
    this.currency = data.currency;
    this.type = data.type;
    this.fileBase64 = data.fileBase64 ?? null;
    this.fileName = data.fileName ?? null;
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

  getType(): string {
    return this.type;
  }

  getFileBase64(): string | null {
    return this.fileBase64;
  }

  getFileName(): string | null {
    return this.fileName;
  }
}
