import { BillsPage } from "@/components/dashboard/bills";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bills" };

export default function Page() {
  return <BillsPage />;
}
