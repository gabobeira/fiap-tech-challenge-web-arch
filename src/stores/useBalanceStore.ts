import { create } from "zustand";

interface BalanceStore {
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
  balance: number;
  setBalance: (newBalance: number) => void;
  updateBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>((set) => ({
  isBalanceVisible: true,
  toggleBalanceVisibility: () =>
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible })),
  balance: 0,
  setBalance: (newBalance) => set({ balance: newBalance }),
  updateBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
}));
