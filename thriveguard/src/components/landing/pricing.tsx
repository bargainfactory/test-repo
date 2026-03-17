"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Start saving today",
    features: [
      "Connect 1 bank account",
      "Expense categorization",
      "3 AI advisor questions/mo",
      "Basic deals marketplace",
      "1 bill negotiation/mo",
    ],
    cta: "Start Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Pro",
    price: { monthly: 9.99, annual: 7.99 },
    description: "For serious savers",
    features: [
      "Unlimited bank accounts",
      "Full AI advisor (unlimited)",
      "Automated bill negotiation",
      "Full deals marketplace",
      "Side hustle quiz & matching",
      "Savings report PDF",
      "Priority support",
    ],
    cta: "Start Pro — 14 Days Free",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: { monthly: 29.99, annual: 24.99 },
    description: "For financial transformation",
    features: [
      "Everything in Pro",
      "Dedicated AI financial coach",
      "Weekly 1-on-1 strategy calls",
      "Credit score monitoring",
      "Investment optimization AI",
      "Tax savings finder",
      "White-glove onboarding",
    ],
    cta: "Go Elite",
    highlight: false,
    badge: "Best Value / Year",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Pro users save an average of $1,247/mo. The plan pays for itself in minutes.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-secondary rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                annual ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              Annual
              <span className="text-xs font-bold text-[#0f766e] bg-[#0f766e]/10 px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "border-[#0f766e] bg-gradient-to-b from-[#0f766e]/5 to-background shadow-2xl shadow-[#0f766e]/10 scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                  plan.highlight
                    ? "bg-[#0f766e] text-white"
                    : "bg-[#d97706] text-white"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground">/mo</span>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    billed ${(plan.price.annual * 12).toFixed(0)}/yr
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      plan.highlight ? "text-[#0f766e]" : "text-muted-foreground"
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/dashboard">
                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className="w-full gap-2"
                  size="lg"
                >
                  {plan.highlight && <Zap className="w-4 h-4" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          No credit card required for Free plan · Cancel anytime · 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
