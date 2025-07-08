import {
  HandCoins,
  LayoutDashboard,
  LogOut,
  WalletMinimal,
} from "lucide-react";

export const SLIDE_ICON = [
  {
    id: "1",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "2",
    label: "Income",
    icon: WalletMinimal,
    path: "/income",
  },
  {
    id: "3",
    label: "Expense",
    icon: HandCoins,
    path: "/expense",
  },
  {
    id: "4",
    label: "Logout",
    icon: LogOut,
    path: "/logout",
  },
];
