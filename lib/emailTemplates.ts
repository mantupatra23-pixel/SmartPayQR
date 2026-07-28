export const getAutoReplyHTML = (name: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: linear-gradient(135deg, #059669, #0d9488); padding: 30px; text-align: center; color: white; }
    .body { padding: 30px; line-height: 1.6; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
    .btn { display: inline-block; background: #059669; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: bold; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin:0; font-size: 24px;">SmartPay AI OS</h1>
      <p style="margin:5px 0 0; opacity: 0.9; font-size: 14px;">Merchant Operating System</p>
    </div>
    <div class="body">
      <h2>Hi ${name || 'Merchant'},</h2>
      <p>Thank you for reaching out regarding <strong>"${subject}"</strong>.</p>
      <p>We received your request successfully. Our technical support team is reviewing it and will get back to you shortly.</p>
      <a href="https://smartpayqr.in" class="btn">Go to Merchant OS Dashboard</a>
    </div>
    <div class="footer">
      <p>© 2026 SmartPay AI OS. All rights reserved.</p>
      <p>NPCI Compliant Merchant Payment Engine</p>
    </div>
  </div>
</body>
</html>
`;

export const getAdminNotificationHTML = (type: string, data: Record<string, any>) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; background-color: #0f172a; color: #f8fafc; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 24px; border: 1px solid #334155; }
    .key { color: #34d399; font-weight: bold; }
    .val { color: #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color: #38bdf8; margin-top: 0;">🚨 New ${type.toUpperCase()} Submission</h2>
    <hr style="border-color: #334155;" />
    ${Object.entries(data).map(([k, v]) => `<p><span class="key">${k}:</span> <span class="val">${typeof v === 'object' ? JSON.stringify(v) : v}</span></p>`).join('')}
  </div>
</body>
</html>
`;
