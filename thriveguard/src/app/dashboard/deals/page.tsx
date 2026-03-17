import { DealsPage } from "@/components/dashboard/deals";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Deals" };

export default function Page() {
  return <DealsPage />;
}
