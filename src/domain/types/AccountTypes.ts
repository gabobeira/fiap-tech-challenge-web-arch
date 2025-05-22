export type Investments = {
  total: number;
  fixed: number;
  variable: number;
};

export type AccountData = {
  id: number;
  idUser: number;
  fullName: string;
  firstName: string;
  balance: number;
  currency: string;
  investments: Investments;
};
