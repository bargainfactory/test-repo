import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ThriveGuard — AI-Powered Financial Shield",
    template: "%s | ThriveGuard",
  },
  description:
    "Automatically find, negotiate, and lock in savings on rent, healthcare, utilities & groceries. Beat the 2026 cost-of-living crisis with AI.",
  keywords: ["savings", "budget", "AI finance", "bill negotiation", "cost of living", "side hustle"],
  openGraph: {
    title: "ThriveGuard — AI-Powered Financial Shield",
    description: "Your finances just got a superpower. Save $1,247/mo on autopilot.",
    type: "website",
    locale: "en_US",
    siteName: "ThriveGuard",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThriveGuard — AI-Powered Financial Shield",
    description: "Your finances just got a superpower.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
            }}
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
