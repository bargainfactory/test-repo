import { HustlesPage } from "@/components/dashboard/hustles";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Side Hustles" };

export default function Page() {
  return <HustlesPage />;
}
