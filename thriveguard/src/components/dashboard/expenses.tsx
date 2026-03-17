"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Upload, Lightbulb, ArrowUpDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_EXPENSES } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#0f766e",
  Groceries: "#14b8a6",
  Utilities: "#06b6d4",
  Insurance: "#8b5cf6",
  Streaming: "#ec4899",
  Transport: "#f59e0b",
  Dining: "#ef4444",
  Internet: "#3b82f6",
  Phone: "#10b981",
};

const categories = [...new Set(MOCK_EXPENSES.map((e) => e.category))];

const pieData = categories.map((cat) => ({
  name: cat,
  value: MOCK_EXPENSES.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
}));

export function ExpensesPage() {
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"amount" | "date">("amount");
  const [showTip, setShowTip] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    toast.success("📊 CSV uploaded and analyzed!", {
      description: "10 expenses categorized by AI. Sample data loaded.",
    });
  }, []);

  const filtered = filter
    ? MOCK_EXPENSES.filter((e) => e.category === filter)
    : MOCK_EXPENSES;

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "amount" ? b.amount - a.amount : new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalSpend = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const potentialSavings = 342;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Expenses</h1>
          <p className="text-muted-foreground mt-1">
            {formatCurrency(totalSpend)}/mo tracked · {formatCurrency(potentialSavings)} potential savings found
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload zone */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upload Bank Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                  dragging
                    ? "border-[#0f766e] bg-[#0f766e]/5"
                    : "border-border hover:border-[#0f766e]/50 hover:bg-secondary/50"
                }`}
                onClick={() => {
                  toast.success("📊 Sample bank data loaded!", {
                    description: "10 transactions imported and categorized.",
                  });
                }}
              >
                <Upload className={`w-10 h-10 mx-auto mb-3 ${dragging ? "text-[#0f766e]" : "text-muted-foreground"}`} />
                <p className="font-semibold text-sm mb-1">
                  {dragging ? "Drop to analyze!" : "Drag & drop CSV"}
                </p>
                <p className="text-xs text-muted-foreground">or click to upload bank statement</p>
              </div>
              <Button
                variant="outline"
                className="w-full mt-3 gap-2"
                onClick={() => {
                  toast.info("🔗 Connecting to Plaid sandbox...", { duration: 2000 });
                  setTimeout(() => toast.success("✅ Bank connected! 10 transactions loaded."), 2500);
                }}
              >
                Connect with Plaid (Mock)
              </Button>
            </CardContent>
          </Card>

          {/* Spending breakdown pie */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[entry.name] || "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {pieData.slice(0, 5).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: CATEGORY_COLORS[item.name] || "#94a3b8" }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expense table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-base">Transactions</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setSortBy(sortBy === "amount" ? "date" : "amount")}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    Sort by {sortBy === "amount" ? "Date" : "Amount"}
                  </Button>
                  {filter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs"
                      onClick={() => setFilter(null)}
                    >
                      <X className="w-3 h-3" /> Clear
                    </Button>
                  )}
                </div>
              </div>
              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(filter === cat ? null : cat)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      filter === cat
                        ? "bg-[#0f766e] text-white border-[#0f766e]"
                        : "border-border text-muted-foreground hover:border-[#0f766e]/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sorted.map((expense, i) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0"
                      style={{ background: `${CATEGORY_COLORS[expense.category] || "#94a3b8"}20` }}
                    >
                      <span style={{ color: CATEGORY_COLORS[expense.category] || "#94a3b8" }}>
                        {expense.category.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{expense.merchant}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px] py-0">{expense.category}</Badge>
                        <span className="text-xs text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold">-{formatCurrency(expense.amount)}</p>
                      <button
                        onClick={() => setShowTip(showTip === expense.id ? null : expense.id)}
                        className="text-[10px] text-[#0f766e] hover:underline flex items-center gap-0.5 ml-auto"
                      >
                        <Lightbulb className="w-2.5 h-2.5" />
                        AI tip
                      </button>
                    </div>
                  </motion.div>
                ))}
                {sorted.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No expenses in this category</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Tip Drawer */}
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Card className="border-[#0f766e]/30 bg-[#0f766e]/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0f766e] flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0f766e] mb-1">AI Savings Tip</p>
                      <p className="text-sm text-muted-foreground">
                        {MOCK_EXPENSES.find((e) => e.id === showTip)?.ai_tip}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
