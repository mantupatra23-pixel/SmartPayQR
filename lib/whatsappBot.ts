import { trackActivity } from "./analyticsTracker";

export const sendWhatsAppMessage = (phone: string, text: string, trackEvent: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const url = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
  trackActivity("whatsAppShares", trackEvent, "WhatsApp Bot");
};

export const WA_TEMPLATES = {
  // 1. Order Formatting Bot
  formatOrder: (storeName: string, product: string, price: number, qty = 1) => 
    `Hello ${storeName},\n\nI would like to place an order:\n\n📦 *Product:* ${product}\n🔢 *Quantity:* ${qty}\n💰 *Price:* ₹${price}\n💳 *Total Amount:* ₹${price * qty}\n\nPlease confirm availability and payment details.`,
  
  // 2. Invoice & Bill Dispatch
  sendInvoice: (customerName: string, invoiceNo: string, amount: number, pdfLink?: string) => 
    `Dear ${customerName || 'Customer'},\n\nThank you for shopping with us!\n\n📄 *Invoice No:* ${invoiceNo}\n💸 *Total Amount:* ₹${amount}\n\n${pdfLink ? `📥 Download Bill: ${pdfLink}\n\n` : ''}Regards,\nSmartPay AI Merchant`,

  // 3. Ledger Payment Reminder
  paymentReminder: (customerName: string, dueAmount: number, upiId: string, storeName: string) => 
    `Hello ${customerName},\n\nThis is a gentle reminder regarding your pending shop balance.\n\n⚠️ *Outstanding Due:* ₹${dueAmount}\n\nYou can easily clear your dues using any UPI app by clicking the link below:\n👉 upi://pay?pa=${upiId}&pn=${storeName}&am=${dueAmount}\n\nThank you for your prompt payment!`,

  // 4. Bulk Marketing & Festival Campaign
  festivalPromo: (customerName: string, storeName: string, discount: string) => 
    `🎉 Happy Festive Season ${customerName}! 🎉\n\nCelebrate with *${storeName}*.\n\n🎁 *Special Offer:* ${discount}\n\nVisit our digital store today to claim your discount:\n👉 https://smartpayqr.in\n\nLooking forward to seeing you!`
};
