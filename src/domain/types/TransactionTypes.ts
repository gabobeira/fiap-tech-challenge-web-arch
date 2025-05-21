export type TransactionData = {
  id: string;
  date: string;
  value: number;
  currency: string;
  type: string;
  fileBase64?: string;
  fileName?: string;
};

export type TransactionParams = Omit<TransactionData, "id">;

export type TransactionForm = Omit<TransactionData, "id" | "date" | "currency">;
