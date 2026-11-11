// src/lib/gate-engine.ts
import { NeedFrame, CandidateProduct, GateResult } from "./types";

/**
 * Deterministik Kural Motoru
 * Bu fonksiyon AI'dan bağımsız çalışır. Sadece matematik ve kurallar.
 */
export function evaluateGates(
  need: NeedFrame,
  product: CandidateProduct,
): GateResult[] {
  const results: GateResult[] = [];

  // KAPI 1: Mandate (Bütçe ve İhtiyaç Kontrolü)
  if (product.price <= need.budget) {
    results.push({
      gateName: "Mandate",
      passed: true,
      reason: `Fiyat ($${product.price}) bütçe ($${need.budget}) içinde.`,
    });
  } else {
    results.push({
      gateName: "Mandate",
      passed: false,
      reason: `Fiyat ($${product.price}) bütçeyi ($${need.budget}) aşıyor! Ödeme engellendi.`,
    });
  }

  // KAPI 2: Seller (Satıcı Güvenliği)
  if (product.isAllowedSeller) {
    results.push({
      gateName: "Seller",
      passed: true,
      reason: `${product.seller} güvenli satıcı listesinde.`,
    });
  } else {
    results.push({
      gateName: "Seller",
      passed: false,
      reason: `${product.seller} güvenli satıcı listesinde değil!`,
    });
  }

  // KAPI 3: Stock (Stok ve Teslimat)
  if (product.stock > 0 && product.shippingDays <= 1) {
    results.push({
      gateName: "Stock",
      passed: true,
      reason: `Ürün stokta var ve yarına yetişiyor.`,
    });
  } else if (product.stock <= 0) {
    results.push({
      gateName: "Stock",
      passed: false,
      reason: `Ürün stokta yok!`,
    });
  } else {
    results.push({
      gateName: "Stock",
      passed: false,
      reason: `Kargo süresi (${product.shippingDays} gün) çok uzun, sunuma yetişmez!`,
    });
  }

  return results;
}

/**
 * Tüm zorunlu (blocking) kapılar geçildi mi?
 */
export function canProceedToPayment(results: GateResult[]): boolean {
  return results.every((r) => r.passed);
}
