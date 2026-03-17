"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Download,
  Share2,
  Copy,
  Check,
  Moon,
  Sun,
  Smartphone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOCK_USER } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import canvasConfetti from "canvas-confetti";

export function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();
  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    weekly: true,
    deals: true,
  });

  const shareText = `I just saved ${formatCurrency(MOCK_USER.totalSaved)} using ThriveGuard's AI! 🚀 Beat the cost-of-living crisis → thriveguard.app`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success("🔗 Share card copied!");
    canvasConfetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    toast.info("📄 Generating your savings report PDF...", { duration: 2000 });
    setTimeout(() => toast.success("✅ Report downloaded! Check your downloads folder."), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center text-white text-2xl font-black">
                  {MOCK_USER.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-lg">{MOCK_USER.name}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_USER.email}</p>
                  <span className="text-xs bg-[#0f766e]/10 text-[#0f766e] border border-[#0f766e]/20 px-2 py-0.5 rounded-full font-semibold">
                    Pro Plan
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
                  <Input defaultValue={MOCK_USER.name} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                  <Input defaultValue={MOCK_USER.email} type="email" />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => toast.success("✅ Profile updated!")}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Snapshot */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-[#0f766e]/20 bg-gradient-to-br from-[#0f766e]/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-base">Your Savings Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Total Saved This Year</p>
                <p className="text-5xl font-black gradient-text mt-1">
                  {formatCurrency(MOCK_USER.totalSaved)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">vs avg American spending 22% less</p>
              </div>

              {[
                { label: "Bills Negotiated", value: "5 bills" },
                { label: "Deals Applied", value: "8 deals" },
                { label: "AI Tips Used", value: "24 tips" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" className="gap-2 text-xs" onClick={handleExport}>
                  <Download className="w-3.5 h-3.5" />
                  Export PDF
                </Button>
                <Button className="gap-2 text-xs" onClick={handleShare}>
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  Share Win
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="w-4 h-4" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email" as const, label: "Email digest", icon: Mail, description: "Daily savings summary" },
                { key: "push" as const, label: "Push notifications", icon: Smartphone, description: "Real-time alerts" },
                { key: "weekly" as const, label: "Weekly report", icon: Bell, description: "Your savings progress" },
                { key: "deals" as const, label: "New deals", icon: Bell, description: "Personalized offers" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifs((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifs[item.key] ? "bg-[#0f766e]" : "bg-border"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        notifs[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4" /> Preferences & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Color Theme</p>
                  <p className="text-xs text-muted-foreground">Dark / Light mode</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-2 rounded-lg transition-all ${theme === "light" ? "bg-card shadow-sm" : ""}`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-2 rounded-lg transition-all ${theme === "dark" ? "bg-card shadow-sm" : ""}`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2 text-sm"
                  onClick={() => toast.success("🔐 WebAuthn setup initiated. Check your authenticator app.")}
                >
                  <Shield className="w-4 h-4" />
                  Enable WebAuthn / Passkey
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-sm"
                  onClick={() => toast.info("📧 Magic link sent to your email!")}
                >
                  <Mail className="w-4 h-4" />
                  Manage Magic Link Auth
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-500/5"
                  onClick={() => toast.info("Account deletion requested. Check your email to confirm.")}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Viral share card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-[#d97706]/20 bg-gradient-to-r from-[#d97706]/5 to-[#0f766e]/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 text-8xl opacity-10 p-4">💰</div>
          <CardContent className="p-6">
            <h3 className="font-black text-xl mb-2">Share Your Savings Win! 🎉</h3>
            <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm mb-4 break-all">
              {shareText}
            </div>
            <Button onClick={handleShare} variant="gold" className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy & Share"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
