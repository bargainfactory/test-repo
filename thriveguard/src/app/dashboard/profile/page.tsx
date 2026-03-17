import { ProfilePage } from "@/components/dashboard/profile";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile & Settings" };

export default function Page() {
  return <ProfilePage />;
}
