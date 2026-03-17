"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, ExternalLink, CheckCircle, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_DEALS } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const BADGE_VARIANTS: Record<string, "hot" | "new" | "eco" | "default" | "gold"> = {
  Hot: "hot",
  New: "new",
  Eco: "eco",
  "Best Value": "gold",
  "Top Pick": "default",
  Limited: "destructive" as any,
};

const categories = ["All", ...new Set(MOCK_DEALS.map((d) => d.category))];

export function DealsPage() {
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("All");

  const handleApply = (dealId: string, dealTitle: string) => {
    setApplied((prev) => new Set([...prev, dealId]));
    toast.success(`✅ Applied to "${dealTitle}"!`, {
      description: "We'll track your savings from this deal.",
    });
  };

  const filtered = filter === "All" ? MOCK_DEALS : MOCK_DEALS.filter((d) => d.category === filter);
  const totalSavable = filtered.reduce((s, d) => s + d.estSaving, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Deals Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Personalized offers · Up to{" "}
            <span className="text-[#0f766e] font-semibold">{formatCurrency(totalSavable)}/mo</span>{" "}
            potential savings
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-xl px-4 py-2">
          <Sparkles className="w-4 h-4 text-[#0f766e]" />
          <span className="text-sm font-semibold text-[#0f766e]">AI-curated for your profile</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all ${
              filter === cat
                ? "bg-[#0f766e] text-white border-[#0f766e]"
                : "border-border text-muted-foreground hover:border-[#0f766e]/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deals grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((deal, i) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3 }}
          >
            <Card className={`h-full transition-all ${applied.has(deal.id) ? "border-emerald-500/30 bg-emerald-500/5" : "hover:shadow-lg"}`}>
              <CardContent className="p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{deal.logo}</div>
                  <Badge variant={BADGE_VARIANTS[deal.badge] || "default"}>
                    {deal.badge}
                  </Badge>
                </div>

                <h3 className="font-bold text-base mb-1">{deal.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{deal.discount}</p>

                <div className="flex items-center gap-2 mb-4 mt-auto">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{deal.category}</span>
                  <span className="text-xs text-muted-foreground">Expires {deal.expires}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Est. savings</p>
                    <p className="text-lg font-black text-[#0f766e]">{formatCurrency(deal.estSaving)}/mo</p>
                  </div>

                  {applied.has(deal.id) ? (
                    <div className="flex items-center gap-1.5 text-emerald-500 text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Applied!
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => handleApply(deal.id, deal.title)}
                    >
                      Apply
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Tag className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="text-lg font-semibold mb-2">No deals in this category yet</h3>
          <p className="text-muted-foreground text-sm">We&apos;re constantly finding new personalized deals for you.</p>
        </div>
      )}
    </div>
  );
}
