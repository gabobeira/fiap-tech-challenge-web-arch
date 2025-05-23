import { FMenuListItem } from "@/components";

export const MENU_ITEMS_DASHBOARD: FMenuListItem[] = [
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

export const MENU_ITEMS_LANDING: FMenuListItem[] = [
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
