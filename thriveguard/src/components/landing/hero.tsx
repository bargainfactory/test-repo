"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingDown, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function AnimatedCounter({ target, duration = 3000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      ${count.toLocaleString()}
    </span>
  );
}

export function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Avg Monthly Savings", value: "$1,247" },
    { label: "Bills Negotiated", value: "48K+" },
    { label: "Success Rate", value: "94%" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f766e]/5 via-background to-[#d97706]/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0f766e]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl" />

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute top-32 left-8 md:left-20 hidden sm:flex items-center gap-2 glass rounded-2xl px-4 py-2 shadow-lg"
      >
        <TrendingDown className="w-4 h-4 text-[#0f766e]" />
        <span className="text-sm font-semibold text-[#0f766e]">-$340 rent saved</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute top-48 right-8 md:right-20 hidden sm:flex items-center gap-2 glass rounded-2xl px-4 py-2 shadow-lg"
      >
        <Zap className="w-4 h-4 text-[#d97706]" />
        <span className="text-sm font-semibold">Bill negotiated! 🎉</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Shield className="w-3.5 h-3.5 text-[#0f766e]" />
          <span className="text-xs font-semibold text-[#0f766e]">
            AI-Powered Financial Shield · 2026 Edition
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mb-6"
        >
          Your finances just got
          <br />
          <span className="gradient-text">a superpower.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ThriveGuard automatically finds, negotiates, and locks in savings on your
          rent, healthcare, utilities & groceries — while surfacing side income
          tailored to <em>you</em>.
        </motion.p>

        {/* Animated savings counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex flex-col items-center glass rounded-3xl px-8 py-6 mb-10 shadow-2xl border-[#0f766e]/20"
        >
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Average user saves in first 30 days
          </p>
          <div className="text-6xl font-black gradient-text">
            {started ? <AnimatedCounter target={1247} duration={3000} /> : "$0"}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live counter updating</span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/dashboard">
            <Button size="xl" className="group gap-2">
              Start Saving Now — It&apos;s Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="gap-2">
            <Play className="w-5 h-5 fill-current" />
            Watch 90s Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-[#0f766e]">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
}
