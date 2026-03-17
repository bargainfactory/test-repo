import { ExpensesPage } from "@/components/dashboard/expenses";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Expenses" };

export default function Page() {
  return <ExpensesPage />;
}
