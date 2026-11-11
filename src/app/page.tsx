"use client";

import React, { useState, useEffect } from "react";
import { translations, Lang } from "@/lib/i18n";
import {
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Scale,
  FileSignature,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Link as LinkIcon,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "IDLE" | "ADVERSARIAL" | "BLOCKED" | "OPTION_WAIT" | "CERTIFIED";

export default function SpendGateTrustEngine() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("IDLE");
  const [currentPrice, setCurrentPrice] = useState(45.0);
  const [certHash, setCertHash] = useState("");
  const [prevHash, setPrevHash] = useState("0x8f2a...c91b");

  // MandatePay'den gelen Dinamik Güven Skoru
  const [trustScore, setTrustScore] = useState(60);
  const dynamicLimit = trustScore >= 50 ? 50.0 : 20.0;

  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "OPTION_WAIT") {
      interval = setInterval(() => {
        setCurrentPrice((prev) => {
          const newPrice = prev - Math.random() * 2;
          return newPrice > 35.0 ? newPrice : prev;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleStart = () => setStep("ADVERSARIAL");

  const handleApprove = () => {
    if (currentPrice > dynamicLimit) {
      setStep("BLOCKED");
      setTrustScore((prev) => Math.max(0, prev - 10));
    } else {
      setStep("OPTION_WAIT");
    }
  };

  const handleCapture = () => {
    const newHash = "0x" + Math.random().toString(36).substring(2, 10) + "...";
    setCertHash(newHash);
    setTrustScore((prev) => Math.min(100, prev + 5));
    setStep("CERTIFIED");
  };

  const reset = () => {
    setStep("IDLE");
    setCurrentPrice(45.0);
    setCertHash("");
    setPrevHash(certHash || prevHash);
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-indigo-500"
    >
      {/* Üst Panel: Dil ve Güven Skoru */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
          <Database className="text-emerald-400 w-5 h-5" />
          <div>
            <div className="text-xs text-slate-400">{t.trustScore}</div>
            <div className="text-xl font-bold text-white">
              {trustScore}/100{" "}
              <span className="text-sm text-emerald-400 font-normal">
                ({t.dynamicLimit}: ${dynamicLimit.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        <select
          className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          onChange={(e) => setLang(e.target.value as Lang)}
          value={lang}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="ar">العربية</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <ShieldCheck className="text-indigo-500 w-10 h-10" /> {t.title}
        </h1>
        <p className="text-slate-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol Panel: A2A Hizmet Talebi ve Ajanlar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400 flex items-center gap-2">
              <FileSignature className="w-5 h-5" /> {t.needFrame}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.what}:</strong> 1M Data Tokens (API)
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.why}:</strong> Train NLP Model
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.where}:</strong> DataAgent-X Provider
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.when}:</strong> 2 Hours (SLA)
              </div>
            </div>
          </div>

          <AnimatePresence>
            {step !== "IDLE" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                    <Cpu className="w-5 h-5" /> {t.buyerAgent}
                  </div>
                  <p className="text-sm text-slate-300">
                    "My NLP training pipeline is stalled. I need 1M tokens
                    immediately to meet the deadline. Proceed with the
                    purchase."
                  </p>
                </div>
                <div className="bg-rose-950/30 border border-rose-900/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                    <TrendingUp className="w-5 h-5" /> {t.advAgent}
                  </div>
                  <p className="text-sm text-slate-300">
                    "{t.fomoWarning} Market data shows a 15% drop is expected in
                    2 hours. Wait for the value option."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === "IDLE" && (
            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {t.btnRequest} <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {step === "ADVERSARIAL" && (
            <button
              onClick={handleApprove}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
            >
              {t.btnApprove}
            </button>
          )}
        </div>

        {/* Sağ Panel: Kapılar, Opsiyon ve Hash-Zincirli Sertifika */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          {step === "IDLE" && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-20">
              <ShieldAlert className="w-16 h-16 opacity-20" />
              <p>Awaiting Agent Request...</p>
            </div>
          )}

          {step === "ADVERSARIAL" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-slate-300 mb-4">
                Deterministic Gates (MandatePay Engine)
              </h3>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-emerald-500/30">
                <span>
                  {t.dynamicLimit} (${dynamicLimit})
                </span>{" "}
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {t.gatePassed}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-emerald-500/30">
                <span>Provider Allowlist</span>{" "}
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {t.gatePassed}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-amber-500/30">
                <span>FOMO Index (Market)</span>{" "}
                <span className="text-amber-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> {t.gateAdvisory}
                </span>
              </div>
            </motion.div>
          )}

          {step === "BLOCKED" && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10"
            >
              <XCircle className="w-20 h-20 text-rose-500" />
              <h3 className="text-2xl font-bold text-white">{t.gateFailed}</h3>
              <p className="text-slate-400">
                Dynamic Limit exceeded. Trust score decreased.
              </p>
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
              >
                Restart Engine
              </button>
            </motion.div>
          )}

          {step === "OPTION_WAIT" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-2 animate-pulse" />
                <h3 className="text-xl font-bold text-white">
                  {t.optionTitle}
                </h3>
                <p className="text-sm text-slate-400">{t.optionDesc}</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-500 mb-1">
                  Authorized API Cost
                </div>
                <div className="text-4xl font-mono text-white mb-2">
                  ${currentPrice.toFixed(2)}
                </div>
                <div className="text-emerald-400 text-sm animate-bounce">
                  {t.priceDrop}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep("BLOCKED")}
                  className="bg-slate-800 text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-700"
                >
                  {t.btnVoid}
                </button>
                <button
                  onClick={handleCapture}
                  className="bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-500"
                >
                  {t.btnCapture}
                </button>
              </div>
            </motion.div>
          )}

          {step === "CERTIFIED" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-6"
            >
              <ShieldCheck className="w-16 h-16 text-emerald-500" />
              <h3 className="text-2xl font-bold text-white">{t.certTitle}</h3>
              <p className="text-sm text-slate-400 px-4">{t.certDesc}</p>

              <div className="w-full bg-slate-950 p-4 rounded-lg border border-slate-800 text-left font-mono text-xs text-slate-500 mt-4 break-all relative">
                <div className="absolute right-2 top-2 text-slate-600">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div className="text-slate-300 mb-1">{"{"}</div>
                <div className="pl-4">"tx_id": "A2A-TX-992",</div>
                <div className="pl-4">
                  "final_value": ${currentPrice.toFixed(2)},
                </div>
                <div className="pl-4 text-indigo-400">
                  "prev_cert_hash": "{prevHash}",
                </div>
                <div className="pl-4 text-emerald-400">
                  "new_cert_hash": "{certHash}"
                </div>
                <div className="text-slate-300">{"}"}</div>
              </div>

              <div className="text-sm text-emerald-400 bg-emerald-950/50 p-2 rounded w-full border border-emerald-900">
                Trust Score Increased to {trustScore}/100!
              </div>

              <button
                onClick={reset}
                className="mt-2 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 text-white w-full"
              >
                Run Next Transaction
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
