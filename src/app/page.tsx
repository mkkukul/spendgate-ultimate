// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { translations, Lang } from "@/lib/i18n";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Lock,
  FileSignature,
  Zap,
  Server,
  Fingerprint,
  ArrowRight,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpendGateApp() {
  // ANA DİL İNGİLİZCE YAPILDI
  const [lang, setLang] = useState<Lang>("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const need = {
    what: "3x USB-C Hub",
    why: "Urgent need for tomorrow's presentation",
    when: "Tomorrow 09:00 AM",
    budget: 60.0,
  };

  const badProduct = {
    id: "prod_001",
    name: "Premium USB-C Hub 8-in-1",
    price: 75.0,
    seller: "UnknownSeller_99",
    stock: 5,
    rating: 4.8,
    shippingDays: 1,
    isAllowedSeller: false,
  };

  const goodProduct = {
    id: "prod_002",
    name: "Anker USB-C Hub 4-in-1",
    price: 25.0,
    seller: "Amazon Official",
    stock: 12,
    rating: 4.9,
    shippingDays: 1,
    isAllowedSeller: true,
  };

  const handleProcess = async (product: any) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ need, product }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ status: "ERROR", message: "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans relative overflow-hidden selection:bg-indigo-500/30">
      {/* Arka Plan Işık Efektleri (Görsel Derinlik) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Üst Bar */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <ShieldCheck className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                SpendGate 2.0
              </h1>
              <p className="text-xs text-slate-400">Agentic Trust Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Network Secured
            </div>
            <select
              className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              onChange={(e) => setLang(e.target.value as Lang)}
              value={lang}
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SOL KOLON: İhtiyaç ve Seçenekler (4 Birim) */}
          <div className="lg:col-span-4 space-y-6">
            {/* İhtiyaç Kartı */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Server className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">
                  5W1H Context
                </h2>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">What:</span>
                  <span className="font-medium text-white text-right">
                    {need.what}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Why:</span>
                  <span className="font-medium text-white text-right max-w-[60%]">
                    {need.why}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">When:</span>
                  <span className="font-medium text-white text-right">
                    {need.when}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5">
                  <span className="text-slate-400">Max Budget:</span>
                  <span className="font-bold text-emerald-400 text-lg">
                    ${need.budget.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Ürün Seçenekleri */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider pl-2">
                Select Target
              </h3>

              {/* Kötü Ürün */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="group bg-gradient-to-br from-slate-900 to-black border border-rose-900/30 rounded-2xl p-5 hover:border-rose-500/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white group-hover:text-rose-400 transition-colors">
                    {badProduct.name}
                  </h3>
                  <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded-md font-bold">
                    ${badProduct.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Seller: {badProduct.seller}
                </p>
                <button
                  onClick={() => handleProcess(badProduct)}
                  disabled={loading}
                  className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2.5 rounded-xl text-sm font-semibold transition-all flex justify-center items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" /> Attempt Malicious Buy
                </button>
              </motion.div>

              {/* İyi Ürün */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="group bg-gradient-to-br from-slate-900 to-black border border-indigo-500/30 rounded-2xl p-5 hover:border-indigo-400/80 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {goodProduct.name}
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-md font-bold">
                    ${goodProduct.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Seller: {goodProduct.seller}
                </p>
                <button
                  onClick={() => handleProcess(goodProduct)}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 py-2.5 rounded-xl text-sm font-semibold transition-all flex justify-center items-center gap-2"
                >
                  <Zap className="w-4 h-4" /> Execute Secure Buy
                </button>
              </motion.div>
            </div>
          </div>

          {/* SAĞ KOLON: Terminal / Sonuç Ekranı (8 Birim) */}
          <div className="lg:col-span-8">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl h-full min-h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
              {/* Terminal Üst Bar */}
              <div className="h-12 border-b border-white/5 bg-black/40 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> SpendGate Execution Log
                </span>
              </div>

              {/* Terminal İçeriği */}
              <div className="flex-1 p-8 flex flex-col justify-center items-center relative">
                {/* Bekleme Ekranı */}
                {!result && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500 blur-[40px] opacity-20 rounded-full animate-pulse" />
                      <Fingerprint className="w-24 h-24 text-slate-700 mx-auto relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-300">
                        Awaiting Transaction
                      </h2>
                      <p className="text-slate-500 text-sm mt-2">
                        Select a product on the left to initiate deterministic
                        validation.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Yükleniyor Ekranı */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6 w-full max-w-md"
                  >
                    <div className="flex justify-center">
                      <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-indigo-400">
                        Evaluating Deterministic Gates...
                      </h2>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ENGELLENDİ (BLOCKED) */}
                {result && result.status === "BLOCKED" && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-2xl"
                  >
                    <div className="flex items-center gap-4 mb-8 border-b border-rose-500/20 pb-4">
                      <div className="p-3 bg-rose-500/20 rounded-xl">
                        <XCircle className="w-8 h-8 text-rose-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Transaction Blocked
                        </h2>
                        <p className="text-rose-400 text-sm">
                          Deterministic rules prevented a financial loss.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {result.gateResults.map((g: any, i: number) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i}
                          className={`p-4 rounded-xl border flex items-start gap-3 ${g.passed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}
                        >
                          {g.passed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                          <div>
                            <p
                              className={`font-semibold text-sm ${g.passed ? "text-emerald-400" : "text-rose-400"}`}
                            >
                              {g.gateName} Gate
                            </p>
                            <p className="text-slate-400 text-sm mt-1">
                              {g.reason}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-black border border-slate-800 p-4 rounded-xl text-center">
                      <p className="text-slate-500 text-sm font-mono">
                        🛑 PayPal API was never contacted. Funds are safe.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* YETKİLENDİRİLDİ (AUTHORIZED) */}
                {result && result.status === "AUTHORIZED" && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-4 mb-6 border-b border-emerald-500/20 pb-4">
                      <div className="p-3 bg-emerald-500/20 rounded-xl">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Funds Authorized
                        </h2>
                        <p className="text-emerald-400 text-sm">
                          All gates passed. PayPal Authorize successful.
                        </p>
                      </div>
                    </div>

                    {/* Görsel Sertifika */}
                    <div className="bg-gradient-to-br from-slate-900 to-black border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Fingerprint className="w-32 h-32 text-indigo-500" />
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <FileSignature className="w-5 h-5 text-indigo-400" />
                        <h3 className="font-semibold text-white">
                          Cryptographic Decision Certificate
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-6 relative z-10">
                        <div>
                          <p className="text-slate-500 mb-1">Transaction ID</p>
                          <p className="font-mono text-white text-xs">
                            {result.certificate.txId}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Final Price</p>
                          <p className="font-mono text-emerald-400 font-bold">
                            ${result.certificate.finalPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-500 mb-1">
                            Current Hash (SHA-256)
                          </p>
                          <p className="font-mono text-indigo-300 text-xs break-all bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
                            {result.certificate.currentCertHash}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-500 mb-1">
                            Digital Signature (HMAC)
                          </p>
                          <p className="font-mono text-slate-400 text-xs break-all">
                            {result.certificate.signature}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                        <span className="text-xs text-slate-500">
                          Immutable Ledger Record
                        </span>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
