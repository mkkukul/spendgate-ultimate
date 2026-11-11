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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpendGateApp() {
  const [lang, setLang] = useState<Lang>("tr");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const t = translations[lang];

  // 🎯 GERÇEK SENARYO: 3 USB-C Hub alımı (Bütçe: 60$)
  const need = {
    what: "3x USB-C Hub",
    why: "Yarınki önemli sunum için acil ihtiyaç",
    when: "Yarın sabah 09:00",
    budget: 60.0,
  };

  // KÖTÜ ÜRÜN (Test için): Fiyatı bütçeyi aşıyor ve satıcı güvenli değil.
  const badProduct = {
    id: "prod_001",
    name: "Premium USB-C Hub 8-in-1",
    price: 75.0, // 60$ bütçeyi aşıyor!
    seller: "UnknownSeller_99",
    stock: 5,
    rating: 4.8,
    shippingDays: 1,
    isAllowedSeller: false,
  };

  // İYİ ÜRÜN: Bütçeye uygun, güvenli satıcı, stokta var.
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
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <div className="max-w-5xl mx-auto flex justify-end mb-8">
        <select
          className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-sm text-white"
          onChange={(e) => setLang(e.target.value as Lang)}
          value={lang}
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <ShieldCheck className="text-indigo-500 w-10 h-10" /> SpendGate 2.0
        </h1>
        <p className="text-slate-400">
          Deterministic Gate & Cryptographic Certificate Demo
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol Taraf: İhtiyaç ve Ürün Seçenekleri */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              İhtiyaç Özeti (5N1K)
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <strong>Ne:</strong> {need.what}
              </li>
              <li>
                <strong>Neden:</strong> {need.why}
              </li>
              <li>
                <strong>Ne Zaman:</strong> {need.when}
              </li>
              <li>
                <strong>Bütçe:</strong>{" "}
                <span className="text-emerald-400 font-bold">
                  ${need.budget.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 border border-rose-900/50 p-4 rounded-xl">
              <h3 className="font-bold text-white mb-1">
                Seçenek A: {badProduct.name}
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                Fiyat: ${badProduct.price} | Satıcı: {badProduct.seller}
              </p>
              <button
                onClick={() => handleProcess(badProduct)}
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm font-semibold"
              >
                Bu Ürünü Satın Almayı Dene
              </button>
            </div>

            <div className="bg-slate-900 border border-emerald-900/50 p-4 rounded-xl">
              <h3 className="font-bold text-white mb-1">
                Seçenek B: {goodProduct.name}
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                Fiyat: ${goodProduct.price} | Satıcı: {goodProduct.seller}
              </p>
              <button
                onClick={() => handleProcess(goodProduct)}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg text-sm font-semibold"
              >
                Bu Ürünü Satın Almayı Dene
              </button>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: API Sonuçları ve Sertifika */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
              <ShieldAlert className="w-16 h-16 opacity-20 mb-4" />
              <p>İşlem sonucu burada görünecek...</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-indigo-400 py-20">
              <Lock className="w-12 h-12 animate-bounce mb-4" />
              <p>API'ye bağlanılıyor, kapılar kontrol ediliyor...</p>
            </div>
          )}

          {result && result.status === "BLOCKED" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-3 text-rose-500 mb-6">
                <XCircle className="w-8 h-8" />
                <h2 className="text-xl font-bold">
                  İşlem Engellendi (Blocked)
                </h2>
              </div>
              <p className="text-sm text-slate-400 mb-4">{result.message}</p>
              <div className="space-y-2">
                {result.gateResults.map((g: any, i: number) => (
                  <div
                    key={i}
                    className={`p-3 rounded border text-sm ${g.passed ? "border-emerald-500/30 text-emerald-400" : "border-rose-500/30 text-rose-400"}`}
                  >
                    <strong>{g.gateName}:</strong> {g.reason}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-6 italic">
                * PayPal API'sine hiç istek atılmadı. Para korundu.
              </p>
            </motion.div>
          )}

          {result && result.status === "AUTHORIZED" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-3 text-emerald-500 mb-6">
                <CheckCircle2 className="w-8 h-8" />
                <h2 className="text-xl font-bold">
                  Yetkilendirildi (Authorized)
                </h2>
              </div>
              <p className="text-sm text-slate-400 mb-4">{result.message}</p>

              <div className="bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono text-slate-400 overflow-x-auto">
                <div className="flex items-center gap-2 mb-2 text-indigo-400">
                  <FileSignature className="w-4 h-4" /> Decision Certificate
                </div>
                <pre>{JSON.stringify(result.certificate, null, 2)}</pre>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
