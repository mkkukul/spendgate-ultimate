// src/lib/types.ts

export type NeedFrame = {
  what: string; // Ne alınacak? (Örn: USB-C Hub)
  why: string; // Neden alınacak? (Örn: Sunum için)
  when: string; // Ne zaman lazım? (Örn: Yarın sabah)
  budget: number; // Toplam bütçe (Örn: 60$)
};

export type CandidateProduct = {
  id: string;
  name: string;
  price: number;
  seller: string;
  stock: number;
  rating: number;
  shippingDays: number;
  isAllowedSeller: boolean;
};

export type GateResult = {
  gateName: "Mandate" | "Seller" | "Stock" | "Advisory";
  passed: boolean;
  reason: string;
};

export type DecisionCertificate = {
  txId: string;
  timestamp: string;
  needFrame: NeedFrame;
  product: CandidateProduct;
  gateResults: GateResult[];
  finalPrice: number;
  prevCertHash: string;
  currentCertHash: string;
  signature: string;
};
