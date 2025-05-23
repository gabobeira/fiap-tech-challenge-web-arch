import { TRANSACTION_TYPES } from "@/constants/transactionTypes";
import { create } from "zustand";

interface TransactionFilterState {
  filterSelected: string[];
  setFilterSelected: (filters: string[]) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<TransactionFilterState>((set) => ({
  filterSelected: [""],
  setFilterSelected: (filters) => set({ filterSelected: filters }),
  resetFilter: () => set({ filterSelected: TRANSACTION_TYPES }),
}));
