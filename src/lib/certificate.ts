// src/lib/certificate.ts
import crypto from "crypto";
import {
  DecisionCertificate,
  NeedFrame,
  CandidateProduct,
  GateResult,
} from "./types";

/**
 * Karar Sertifikası Üretici
 * Her işlemi bir önceki işlemin hash'i ile zincirleyerek değiştirilemez bir defter oluşturur.
 */
export function generateCertificate(
  need: NeedFrame,
  product: CandidateProduct,
  gates: GateResult[],
  finalPrice: number,
  previousHash: string,
): DecisionCertificate {
  const txId = "TX-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  const timestamp = new Date().toISOString();

  // Sertifika içeriğini (payload) oluşturuyoruz
  const payload = {
    txId,
    timestamp,
    needWhat: need.what,
    productId: product.id,
    finalPrice,
    gatesPassed: gates.map((g) => `${g.gateName}:${g.passed}`).join("|"),
  };

  // 1. Mevcut İşlemin Hash'ini oluştur (SHA-256)
  const currentCertHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");

  // 2. Dijital İmza oluştur (Sistemi taklit ediyoruz, gerçekte Ed25519 kullanılır)
  // Bu imza, "Bu kararı gerçekten bizim sistemimiz onayladı" kanıtıdır.
  const signature = crypto
    .createHmac("sha256", "SPENDGATE_SECRET_KEY")
    .update(currentCertHash)
    .digest("hex");

  return {
    txId,
    timestamp,
    needFrame: need,
    product,
    gateResults: gates,
    finalPrice,
    prevCertHash: previousHash,
    currentCertHash,
    signature,
  };
}
