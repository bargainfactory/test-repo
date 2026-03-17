"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ExternalLink, ChevronDown, ChevronUp, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_HUSTLES } from "@/lib/fake-data";
import { toast } from "sonner";

const QUIZ_QUESTIONS = [
  {
    id: "skills",
    question: "What's your primary skill set?",
    options: ["Tech / Programming", "Creative / Design", "Teaching / Coaching", "Physical / Hands-on", "Sales / Marketing"],
  },
  {
    id: "time",
    question: "How many hours per week can you dedicate?",
    options: ["1–5 hrs", "5–15 hrs", "15–30 hrs", "30+ hrs (full replacement)"],
  },
  {
    id: "goal",
    question: "What's your income goal?",
    options: ["$200–500/mo extra", "$500–1,500/mo extra", "$1,500–5,000/mo extra", "Replace my full income"],
  },
];

export function HustlesPage() {
  const [quizDone, setQuizDone] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[quizStep].id]: answer };
    setAnswers(newAnswers);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
      toast.success("🎯 Quiz complete! Your top matches are ready.", { duration: 3000 });
    }
  };

  const handleSave = (id: string, title: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else { next.add(id); toast.success(`⭐ "${title}" saved to your list!`); }
      return next;
    });
  };

  const sortedHustles = [...MOCK_HUSTLES].sort((a, b) => b.match - a.match);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Side Hustle Finder</h1>
        <p className="text-muted-foreground mt-1">
          AI-matched income opportunities tailored to your skills and schedule
        </p>
      </div>

      {/* Quiz section */}
      <AnimatePresence mode="wait">
        {!quizDone ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-[#0f766e]/20 bg-gradient-to-br from-[#0f766e]/5 to-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#d97706]" />
                  <span className="text-sm font-semibold text-[#d97706]">
                    AI Quiz — Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-border rounded-full mb-6">
                  <motion.div
                    className="h-full bg-[#0f766e] rounded-full"
                    animate={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h2 className="text-xl font-bold mb-4">
                  {QUIZ_QUESTIONS[quizStep].question}
                </h2>

                <div className="grid sm:grid-cols-2 gap-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className="text-left p-4 rounded-2xl border-2 border-border hover:border-[#0f766e] hover:bg-[#0f766e]/5 transition-all text-sm font-medium"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg shrink-0">
                🎯
              </div>
              <div>
                <p className="font-bold">Your personalized hustle matches are ready!</p>
                <p className="text-sm text-muted-foreground">
                  Based on your profile — sorted by AI match score
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto shrink-0"
                onClick={() => { setQuizDone(false); setQuizStep(0); setAnswers({}); }}
              >
                Retake Quiz
              </Button>
            </div>

            <div className="space-y-3">
              {sortedHustles.map((hustle, i) => (
                <motion.div
                  key={hustle.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card className={`transition-all ${hustle.match >= 90 ? "border-[#0f766e]/30" : ""}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl shrink-0">{hustle.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold">{hustle.title}</h3>
                            {hustle.match >= 90 && (
                              <Badge variant="default" className="text-[10px]">
                                🔥 Top Match
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px]">{hustle.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{hustle.description}</p>

                          <div className="flex flex-wrap gap-3 text-sm mb-3">
                            <span className="font-bold text-[#0f766e]">{hustle.earnings}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">{hustle.time}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">Difficulty: {hustle.difficulty}</span>
                          </div>

                          {/* Match score */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex-1 h-2 bg-secondary rounded-full">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${hustle.match}%` }}
                                transition={{ delay: i * 0.07 + 0.3, duration: 0.6 }}
                              />
                            </div>
                            <span className="text-sm font-bold text-[#0f766e] shrink-0">{hustle.match}% match</span>
                          </div>

                          <AnimatePresence>
                            {expanded === hustle.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 border-t border-border mb-3">
                                  <p className="text-xs font-semibold text-muted-foreground mb-2">Platforms to start on:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {hustle.platforms.map((platform) => (
                                      <span
                                        key={platform}
                                        className="text-xs px-2.5 py-1 bg-secondary rounded-full border border-border"
                                      >
                                        {platform}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            onClick={() => handleSave(hustle.id, hustle.title)}
                            className={`p-2 rounded-xl border transition-all ${
                              saved.has(hustle.id)
                                ? "border-[#d97706] text-[#d97706] bg-[#d97706]/10"
                                : "border-border text-muted-foreground hover:border-[#d97706]/50"
                            }`}
                          >
                            <Star className={`w-4 h-4 ${saved.has(hustle.id) ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={() => setExpanded(expanded === hustle.id ? null : hustle.id)}
                            className="p-2 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-all"
                          >
                            {expanded === hustle.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3 flex-wrap">
                        <Button
                          size="sm"
                          className="gap-1.5 text-xs flex-1 sm:flex-none"
                          onClick={() => toast.info(`🚀 Opening ${hustle.platforms[0]} in new tab...`)}
                        >
                          Get Started <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs flex-1 sm:flex-none"
                          onClick={() => toast.info("💬 AI Advisor can create your pitch/profile for this hustle!")}
                        >
                          Ask AI Advisor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
