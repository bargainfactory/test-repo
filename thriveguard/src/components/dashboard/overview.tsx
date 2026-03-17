"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Zap,
  ArrowRight,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MOCK_USER, MOCK_SAVINGS_CHART, MOCK_NET_WORTH, MOCK_EXPENSES } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import canvasConfetti from "canvas-confetti";

function SavingsScore({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 136 136">
        <circle
          cx="68" cy="68" r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="12"
        />
        <motion.circle
          cx="68" cy="68" r={radius}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black">{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function OverviewPage() {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (!confettiFired.current) {
      confettiFired.current = true;
      setTimeout(() => {
        canvasConfetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.4 },
          colors: ["#0f766e", "#14b8a6", "#d97706", "#fbbf24"],
        });
        toast.success("🎉 You've saved $1,247 this month!", {
          description: "That's 22% more than last month. Keep it up!",
          duration: 5000,
        });
      }, 1000);
    }
  }, []);

  const kpis = [
    {
      label: "Total Saved",
      value: formatCurrency(MOCK_USER.totalSaved),
      change: "+22%",
      up: true,
      icon: DollarSign,
      color: "text-[#0f766e]",
      bg: "bg-[#0f766e]/10",
    },
    {
      label: "Monthly Income",
      value: formatCurrency(MOCK_USER.monthlyIncome),
      change: "Stable",
      up: true,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Monthly Expenses",
      value: formatCurrency(MOCK_USER.monthlyExpenses),
      change: "-8%",
      up: false,
      icon: TrendingDown,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Opportunities Left",
      value: "$342",
      change: "9 found",
      up: true,
      icon: Zap,
      color: "text-[#d97706]",
      bg: "bg-[#d97706]/10",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">
            Good morning, {MOCK_USER.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Your financial shield is active. Here&apos;s today&apos;s snapshot.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto" onClick={() => {
          toast.info("🔗 Connecting to Plaid sandbox...", { duration: 2000 });
          setTimeout(() => toast.success("✅ Bank account connected! Sample data loaded.", { duration: 3000 }), 2500);
        }}>
          <LinkIcon className="w-4 h-4" />
          Connect Bank
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                  <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-black">{kpi.value}</p>
                <p className={`text-xs mt-1 font-medium ${kpi.up ? "text-emerald-500" : "text-blue-500"}`}>
                  {kpi.change} vs last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Savings Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Savings Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <SavingsScore score={MOCK_USER.savingsScore} />
              <div className="w-full space-y-2.5">
                {[
                  { label: "Bills Optimized", value: 72 },
                  { label: "Budget Adherence", value: 85 },
                  { label: "Income Diversification", value: 45 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5" />
                  </div>
                ))}
              </div>
              <Link href="/dashboard/advisor" className="w-full">
                <Button variant="outline" className="w-full gap-2 text-sm">
                  Boost my score <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Monthly Savings</CardTitle>
                <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  +$559 vs Oct
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={MOCK_SAVINGS_CHART}>
                  <defs>
                    <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f766e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="savings" name="Savings" stroke="#0f766e" strokeWidth={2.5} fill="url(#savingsGrad)" dot={{ fill: "#0f766e", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Net Worth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Inflation-Adjusted Net Worth</CardTitle>
              <span className="text-xs text-muted-foreground">Nominal vs Real (2026 dollars)</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MOCK_NET_WORTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="nominal" name="Nominal" stroke="#0f766e" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="adjusted" name="Inflation-Adjusted" stroke="#d97706" strokeWidth={2.5} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick AI Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-[#0f766e]/20 bg-gradient-to-r from-[#0f766e]/5 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#d97706]" />
              AI Quick Wins This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOCK_EXPENSES.slice(0, 3).map((expense) => (
                <div key={expense.id} className="bg-background rounded-xl p-3 border border-border">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[#0f766e]">{expense.category}</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(expense.amount)}/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{expense.ai_tip}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard/advisor">
              <Button variant="outline" className="mt-4 gap-2 text-sm">
                See all AI recommendations <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
