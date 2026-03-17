"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingDown,
  FileText,
  ShoppingBag,
  Briefcase,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Financial Advisor",
    description:
      "Ask anything — 'How do I cut rent 15%?' or 'Find me a side hustle.' Get hyper-personalized, context-aware money strategies.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: TrendingDown,
    title: "Automatic Bill Negotiation",
    description:
      "One click generates a proven negotiation letter. 94% success rate with landlords, ISPs, and insurance providers.",
    color: "from-[#0f766e] to-[#14b8a6]",
    glow: "shadow-teal-500/20",
  },
  {
    icon: FileText,
    title: "Smart Expense Analysis",
    description:
      "Upload your bank CSV or connect Plaid. AI categorizes spending and flags every dollar you're leaving on the table.",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    icon: ShoppingBag,
    title: "Personalized Deals Marketplace",
    description:
      "Curated coupons, insurance quotes, and local services matched to your spending profile. One-click apply.",
    color: "from-[#d97706] to-[#fbbf24]",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Briefcase,
    title: "Side Income Matcher",
    description:
      "Take our 2-minute quiz and get matched to the highest-paying gigs for your skillset with realistic earning estimates.",
    color: "from-emerald-500 to-green-500",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description:
      "AES-256 encryption at rest, zero-knowledge architecture, WebAuthn support. Your data is yours — always.",
    color: "from-slate-600 to-slate-800",
    glow: "shadow-slate-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#0f766e]">Everything you need</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Beat inflation.{" "}
            <span className="gradient-text">On autopilot.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Six powerful tools working together to fight the 2026 cost-of-living crisis on your behalf.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0f766e]/0 to-[#d97706]/0 group-hover:from-[#0f766e]/5 group-hover:to-[#d97706]/5 transition-all duration-300" />

              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg ${feature.glow}`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
