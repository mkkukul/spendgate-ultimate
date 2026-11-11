// src/lib/paypal.ts
import crypto from "crypto";

/**
 * PayPal Mock Adapter
 * Gerçek PayPal API'sinin (Orders v2) JSON yapılarını birebir taklit eder.
 * Jüriye "Bunu gerçek API'ye geçirmek için sadece token ekleyeceğiz" diyebiliriz.
 */
export const PayPalMock = {
  // 1. Sipariş Oluşturma
  createOrder: async (amount: number) => {
    await new Promise((res) => setTimeout(res, 800)); // Ağ gecikmesi simülasyonu
    return {
      id: "PAYPAL-ORD-" + crypto.randomBytes(4).toString("hex").toUpperCase(),
      status: "CREATED",
      intent: "AUTHORIZE",
      purchase_units: [
        { amount: { currency_code: "USD", value: amount.toFixed(2) } },
      ],
    };
  },

  // 2. Yetkilendirme (Parayı Kilitle)
  authorize: async (orderId: string) => {
    await new Promise((res) => setTimeout(res, 600));
    return {
      id: "AUTH-" + crypto.randomBytes(4).toString("hex").toUpperCase(),
      status: "COMPLETED",
      order_id: orderId,
      create_time: new Date().toISOString(),
    };
  },

  // 3. Tahsilat (Parayı Çek)
  capture: async (authId: string) => {
    await new Promise((res) => setTimeout(res, 500));
    return {
      id: "CAPTURE-" + crypto.randomBytes(4).toString("hex").toUpperCase(),
      status: "COMPLETED",
      auth_id: authId,
    };
  },

  // 4. İptal (Parayı Serbest Bırak)
  void: async (authId: string) => {
    await new Promise((res) => setTimeout(res, 400));
    return {
      id: authId,
      status: "VOIDED",
    };
  },
};
