# SpendGate 2.0: The Agentic Trust Engine 🛡️

> **"AI negotiates. Gates decide. Immutable Ledger proves."**
> _No cryptographic certificate, no payment._

## 🚀 The Ultimate Hackathon Fusion

SpendGate 2.0 is the culmination of multiple AI prototypes, combining the best features to solve the biggest challenge in **Agentic Commerce**: How do we let AI agents transact autonomously without losing trust, control, or security?

### 🧬 Core Innovations (The "100/100" Stack):

1. **Agent-to-Agent (A2A) Commerce:** The AI is not buying a toaster; it's a Data Agent purchasing 1M API tokens from a Service Provider Agent to train an NLP model.
2. **Dynamic Spending Trust Engine:** Static limits are dead. SpendGate uses a Trust Score. If the AI makes a successful purchase, its dynamic limit increases. If a limit is exceeded or a transaction is voided, the limit is tightened.
3. **Adversarial AI + Market Intel:** The _Buyer Agent_ wants to buy. The _Devil's Advocate Agent_ analyzes market data (FOMO Index, 90-day peaks) and argues to wait for a better price.
4. **Price/Value Option:** We utilize the `Authorize -> Wait -> Capture/Void` flow to lock funds, wait for the best market rate, and settle only when the value is optimal.
5. **Hash-Chained Decision Certificates:** Every decision generates an `ed25519` signed JSON certificate. Crucially, it contains the `prev_cert_hash`, creating an immutable, verifiable ledger of all AI spending behavior.

## 🛠️ PayPal API Mock Architecture

Due to regional restrictions (Turkey), live PayPal Sandbox API keys could not be provisioned. To ensure the project is fully functional and reviewable by the jury, we implemented a **PayPal Mock Adapter**. The mock strictly adheres to PayPal's Orders v2 JSON schema (`CREATED`, `AUTHORIZE`, `CAPTURE`, `VOID`).

## 💻 Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS, Framer Motion
- **Icons:** Lucide React
- **I18n:** Full native support for 9 languages (EN, TR, FR, ES, DE, IT, AR, PT, RU) with RTL support for Arabic.

## 🎮 How to Run & Test

1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
4. **Test the Trust Engine:** Click **"Request Service"**. Notice the Dynamic Limit is set to $50.
5. Click **"Approve & Authorize"**. Watch the Price Option window as the API cost drops.
6. Click **"Capture & Settle"**. Watch the Trust Score go up, and the cryptographic hash chain expand.

## 🇹🇷 Türkçe Özet

SpendGate 2.0, yapay zekanın harcamalarını kontrol eden deterministik bir katmandır. Dinamik Güven Skoru (Trust Score) sayesinde ajanın limitleri başarısına göre artar veya azalır. İki AI ajanı (Alıcı ve Şeytanın Avukatı) piyasa zekasıyla çatışır. Her işlem sonunda bir önceki işlemin şifresini (hash) içeren, değiştirilemez bir "Karar Sertifikası" üretilir. Sertifika yoksa ödeme yoktur.
