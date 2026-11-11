# SpendGate 2.0: The Agentic Trust Engine 🛡️

> **"AI negotiates. Gates decide. Cryptography proves."**
> _No cryptographic certificate, no payment._

## 🚀 The Problem

In the era of Agentic Commerce, autonomous AI agents can browse and purchase items on behalf of humans. However, letting an AI spend money freely is a massive security risk. A simple spending limit is not enough. We need to ensure the AI is buying the **right thing**, from the **right seller**, at the **right price**, and have **indisputable proof** of why the transaction occurred.

## 💡 The Solution: SpendGate 2.0

SpendGate is a Full-Stack Deterministic Control Plane that sits between the AI and the Payment Gateway.

### 🧬 Core Innovations:

1. **5W1H Need Analysis:** The system structures the purchase intent (What, Why, When, Budget) before any transaction begins.
2. **Deterministic Gate Engine:** AI might hallucinate, but math doesn't. A robust, rule-based engine evaluates every transaction against strict Mandate (budget), Seller Allowlist, and Stock/Delivery constraints. If a gate turns red, **the payment API is never even contacted.**
3. **Cryptographic Decision Certificates:** Every successful transaction generates an immutable receipt. It includes a SHA-256 hash of the decision payload and a digital HMAC signature. This serves as indisputable evidence for disputes or tax audits.
4. **PayPal Mock Adapter:** The system simulates the full `Orders v2` lifecycle (`Create -> Authorize`). The architecture is ready to switch to live PayPal credentials instantly.

## 🏗️ Architecture

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion (Premium Glassmorphism UI).
- **Backend API:** Next.js API Routes (`/api/process`).
- **Core Logic:** TypeScript (`gate-engine.ts`, `certificate.ts`).
- **I18n:** Native English (Primary) with 9 language support.

## 🎮 How to Run & Test the Engine

1. Clone the repo: `git clone https://github.com/mkkukul/spendgate-ultimate.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)
5. **Test the Blocking Gate:** Click **"Attempt Malicious Buy"** (Red Button). The engine will catch that the price ($75) exceeds the budget ($60) and the seller is unverified. The transaction is blocked before reaching PayPal.
6. **Test the Success Flow:** Click **"Execute Secure Buy"** (Blue Button). All gates pass. PayPal Mock authorizes the payment, and a **Cryptographically Signed Decision Certificate** is generated and displayed in the terminal.

## 🇹🇷 Türkçe Özet

SpendGate 2.0, otonom yapay zekaların para harcarken kontrolü kaybetmemesini sağlayan bir "Güven Motorudur". Sadece bütçe kontrolü yapmaz; satıcı güvenliğini, stok durumunu ve teslimat süresini **Deterministik Kapılar** (Kural Motoru) ile denetler. Eğer bir kural ihlal edilirse (örneğin fiyat bütçeyi aşarsa), sistem PayPal API'sine hiç istek atmadan işlemi engeller. Başarılı her işlem sonunda ise, bir daha değiştirilemeyecek şekilde **Kriptografik olarak imzalanmış bir Karar Sertifikası** üretir.
