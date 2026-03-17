import { OverviewPage } from "@/components/dashboard/overview";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  return <OverviewPage />;
}
