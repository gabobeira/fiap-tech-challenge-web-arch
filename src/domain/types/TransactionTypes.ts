export type TransactionType =
  | "Depósito"
  | "Saque"
  | "Transferência"
  | "Pagamento"
  | "Empréstimo";

export type TransactionData = {
  id: string;
  date: string;
  value: number;
  currency: string;
  type: TransactionType;
  fileBase64?: string;
  fileName?: string;
  idAccount: number;
};

export type TransactionParams = Omit<TransactionData, "id">;

export type TransactionForm = Omit<
  TransactionData,
  "id" | "date" | "currency" | "idAccount"
>;
