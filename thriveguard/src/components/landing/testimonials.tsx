"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % MOCK_TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-[#0f766e]/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Real people.{" "}
            <span className="gradient-text">Real savings.</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join 48,000+ people crushing the cost-of-living crisis.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                {Array.from({ length: MOCK_TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#d97706] fill-[#d97706]" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground/90">
                &ldquo;{MOCK_TESTIMONIALS[current].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center text-2xl text-white font-bold">
                  {MOCK_TESTIMONIALS[current].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{MOCK_TESTIMONIALS[current].name}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_TESTIMONIALS[current].role}</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-full px-4 py-1.5">
                  <span className="text-sm font-bold text-[#0f766e]">
                    Saved {formatCurrency(MOCK_TESTIMONIALS[current].saved)}/mo
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {MOCK_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-[#0f766e]" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
