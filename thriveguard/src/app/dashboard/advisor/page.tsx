import { AdvisorPage } from "@/components/dashboard/advisor";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI Advisor" };

export default function Page() {
  return <AdvisorPage />;
}
