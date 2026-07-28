import crypto from "crypto";

export interface UpiIntentParams {
  pa: string; // Merchant VPA
  pn: string; // Merchant Name
  am: number; // Amount
  tn: string; // Transaction Note / Order ID
  tr: string; // Ref ID
}

// 1. Direct UPI Intent Link Generator
export const generateUpiIntentLink = (params: UpiIntentParams, app: "gpay" | "phonepe" | "paytm" | "bhim" | "generic") => {
  const baseUrl = `upi://pay?pa=${encodeURIComponent(params.pa)}&pn=${encodeURIComponent(params.pn)}&am=${params.am.toFixed(2)}&tn=${encodeURIComponent(params.tn)}&tr=${params.tr}&cu=INR`;

  switch (app) {
    case "gpay":
      return `gpay://upi/pay?pa=${encodeURIComponent(params.pa)}&pn=${encodeURIComponent(params.pn)}&am=${params.am.toFixed(2)}&tn=${encodeURIComponent(params.tn)}&tr=${params.tr}&cu=INR`;
    case "phonepe":
      return `phonepe://pay?pa=${encodeURIComponent(params.pa)}&pn=${encodeURIComponent(params.pn)}&am=${params.am.toFixed(2)}&tn=${encodeURIComponent(params.tn)}&tr=${params.tr}&cu=INR`;
    case "paytm":
      return `paytmmp://pay?pa=${encodeURIComponent(params.pa)}&pn=${encodeURIComponent(params.pn)}&am=${params.am.toFixed(2)}&tn=${encodeURIComponent(params.tn)}&tr=${params.tr}&cu=INR`;
    case "bhim":
      return `bhim://pay?pa=${encodeURIComponent(params.pa)}&pn=${encodeURIComponent(params.pn)}&am=${params.am.toFixed(2)}&tn=${encodeURIComponent(params.tn)}&tr=${params.tr}&cu=INR`;
    default:
      return baseUrl;
  }
};

// 2. Razorpay Webhook Signature Verifier
export const verifyRazorpaySignature = (orderId: string, paymentId: string, signature: string, secret: string): boolean => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");
  return expectedSignature === signature;
};

// 3. Cashfree Webhook Signature Verifier
export const verifyCashfreeSignature = (rawBody: string, signature: string, secret: string): boolean => {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");
  return expectedSignature === signature;
};

// 4. PhonePe Payload Signer
export const generatePhonePeSignature = (base64Payload: string, apiEndPoint: string, saltKey: string) => {
  const stringToSign = base64Payload + apiEndPoint + saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
  return `${sha256}###1`;
};
