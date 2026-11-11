// src/app/api/process/route.ts
import { NextResponse } from "next/server";
import { evaluateGates, canProceedToPayment } from "@/lib/gate-engine";
import { generateCertificate } from "@/lib/certificate";
import { PayPalMock } from "@/lib/paypal";
import { NeedFrame, CandidateProduct } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const need: NeedFrame = body.need;
    const product: CandidateProduct = body.product;

    // 1. Deterministik Kapıları Çalıştır
    const gateResults = evaluateGates(need, product);

    // 2. Eğer kapılardan biri bile kırmızıysa işlemi REDDET (PayPal'a hiç gitmez)
    if (!canProceedToPayment(gateResults)) {
      return NextResponse.json(
        {
          status: "BLOCKED",
          message: "Deterministic gates failed. Transaction aborted.",
          gateResults,
        },
        { status: 403 },
      );
    }

    // 3. Tüm kapılar yeşilse PayPal Order Oluştur ve Parayı KİLİTLE (Authorize)
    const order = await PayPalMock.createOrder(product.price);
    const auth = await PayPalMock.authorize(order.id);

    // 4. Karar Sertifikasını Üret (Önceki hash'e mock bir başlangıç değeri veriyoruz)
    const prevHash =
      "0000000000000000000000000000000000000000000000000000000000000000"; // Genesis block
    const certificate = generateCertificate(
      need,
      product,
      gateResults,
      product.price,
      prevHash,
    );

    // 5. Başarılı yanıtı dön
    return NextResponse.json({
      status: "AUTHORIZED",
      message: "Gates passed. Funds locked via PayPal Authorize.",
      paypalOrderId: order.id,
      paypalAuthId: auth.id,
      gateResults,
      certificate,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
