"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Copy,
  Check,
  TrendingDown,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_BILLS, generateNegotiationEmail } from "@/lib/fake-data";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

type Bill = typeof MOCK_BILLS[0];
type NegotiateStatus = Record<string, "idle" | "sent" | "success">;

export function BillsPage() {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [copied, setCopied] = useState(false);
  const [statuses, setStatuses] = useState<NegotiateStatus>({});

  const totalMonthly = MOCK_BILLS.reduce((s, b) => s + b.amount, 0);
  const totalSavable = MOCK_BILLS.reduce((s, b) => s + b.potentialSaving, 0);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("📋 Letter copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkSent = (billId: string) => {
    setStatuses((prev) => ({ ...prev, [billId]: "sent" }));
    toast.info("📬 Status updated to 'Sent'");
    setSelectedBill(null);
  };

  const handleMarkSuccess = (billId: string) => {
    setStatuses((prev) => ({ ...prev, [billId]: "success" }));
    toast.success("🎉 Negotiation successful! Savings recorded.");
    setSelectedBill(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Bills & Subscriptions</h1>
        <p className="text-muted-foreground mt-1">
          {formatCurrency(totalMonthly)}/mo in recurring bills ·{" "}
          <span className="text-[#0f766e] font-semibold">{formatCurrency(totalSavable)}/mo potential savings</span>
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Monthly", value: formatCurrency(totalMonthly), icon: "💳" },
          { label: "Potential Savings", value: formatCurrency(totalSavable), icon: "💰" },
          { label: "Bills Negotiable", value: `${MOCK_BILLS.filter((b) => b.negotiable).length} of ${MOCK_BILLS.length}`, icon: "📝" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xl font-black">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bills list */}
      <div className="space-y-3">
        {MOCK_BILLS.map((bill, i) => {
          const status = statuses[bill.id] || "idle";
          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className={`transition-all ${status === "success" ? "border-emerald-500/30 bg-emerald-500/5" : ""}`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl shrink-0">
                      {bill.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold">{bill.name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{bill.category}</Badge>
                        {status === "sent" && (
                          <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/30">
                            <Clock className="w-2.5 h-2.5 mr-1" /> Pending
                          </Badge>
                        )}
                        {status === "success" && (
                          <Badge variant="success" className="text-[10px]">
                            <CheckCircle className="w-2.5 h-2.5 mr-1" /> Saved!
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <span>{formatCurrency(bill.amount)}/mo</span>
                        <span>·</span>
                        <span>Due {bill.dueDate}</span>
                        {bill.potentialSaving > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-[#0f766e] font-semibold flex items-center gap-1">
                              <TrendingDown className="w-3.5 h-3.5" />
                              Save up to {formatCurrency(bill.potentialSaving)}/mo
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {status === "success" ? (
                        <span className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Negotiated!
                        </span>
                      ) : bill.negotiable ? (
                        <>
                          {status === "sent" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs gap-1 text-emerald-600"
                              onClick={() => handleMarkSuccess(bill.id)}
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Mark Won
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="gap-1.5 text-xs"
                            onClick={() => setSelectedBill(bill)}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            {status === "sent" ? "View Letter" : "Negotiate Now"}
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                          Fixed rate
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Negotiate Modal */}
      <AnimatePresence>
        {selectedBill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelectedBill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold">
                    Negotiation Letter — {selectedBill.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    AI-generated · 94% success rate
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBill(null)}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="bg-secondary/50 rounded-xl p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap border border-border">
                  {generateNegotiationEmail(selectedBill)}
                </div>

                <div className="mt-4 p-3 bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-xl text-sm">
                  <p className="font-semibold text-[#0f766e] mb-1">💡 Pro Tips</p>
                  <ul className="text-muted-foreground space-y-1 text-xs">
                    <li>• Replace all [brackets] with your real info before sending</li>
                    <li>• Call first if possible — higher success rate than email alone</li>
                    <li>• Ask for retention department specifically</li>
                    <li>• Be polite but firm — silence works after your ask</li>
                  </ul>
                </div>
              </div>

              <div className="p-5 border-t border-border flex items-center gap-3 flex-wrap">
                <Button
                  className="gap-2 flex-1 sm:flex-none"
                  onClick={() => handleCopy(generateNegotiationEmail(selectedBill))}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Letter"}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-1 sm:flex-none"
                  onClick={() => handleMarkSent(selectedBill.id)}
                >
                  <Clock className="w-4 h-4" />
                  Mark as Sent
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
