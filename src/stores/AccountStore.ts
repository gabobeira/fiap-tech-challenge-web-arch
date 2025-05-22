import { DashboardView } from "@/constants/menuItems";
import { AccountData } from "@/domain/types/AccountTypes";
import { TransactionData } from "@/domain/types/TransactionTypes";
import { create } from "zustand";

type DashboardViewState = DashboardView;
type AccountState = AccountData;
type TransactionsState = TransactionData[];

type AccountStoreState = {
  account: AccountState;
  transactions: TransactionsState;
  isBalanceVisible: boolean;
  dashboardView: DashboardViewState;
  sessionExpired: boolean;
};

type AccountStore = AccountStoreState & {
  setAccount: (account: AccountState) => void;
  setTransactions: (transactions: TransactionsState) => void;
  toggleBalanceVisibility: () => void;
  setDashboardView: (view: DashboardViewState) => void;
  setSessionExpired: (sessionExpired: boolean) => void;
};

const initialState: AccountStoreState = {
  account: {
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
    id: 0,
    idUser: 0,
    investments: {
      total: 0,
      fixed: 0,
      variable: 0,
    },
  },
  transactions: [],
  isBalanceVisible: false,
  dashboardView: "summary",
  sessionExpired: false,
};

export const useAccountStore = create<AccountStore>((set) => ({
  ...initialState,
  setAccount: (account: AccountState) => set({ account }),
  setTransactions: (transactions: TransactionsState) => set({ transactions }),
  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),
  setDashboardView: (view: DashboardViewState) => set({ dashboardView: view }),
  setSessionExpired: (sessionExpired: boolean) => set({ sessionExpired }),
}));
