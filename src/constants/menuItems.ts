import { FMenuListItem } from "@/components";

export type DashboardView = "summary" | "transactions" | "investments";

export const MENU_ITEMS_DASHBOARD: FMenuListItem<DashboardView>[] = [
  {
    label: "Início",
    path: "/",
    view: "summary",
  },
  {
    label: "Transações",
    path: "/transferencias",
    view: "transactions",
  },
  {
    label: "Investimentos",
    path: "/investimentos",
    view: "investments",
  },
];

export const MENU_ITEMS_LANDING: FMenuListItem<string>[] = [
  {
    label: "Sobre",
    path: "/sobre",
    view: "about",
  },
  {
    label: "Serviços",
    path: "/servicos",
    view: "services",
  },
];
