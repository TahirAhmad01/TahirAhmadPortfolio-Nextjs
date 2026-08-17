import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { from_name, email, phone, subject, message } = req.body || {};

  if (!from_name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const ownerEmail = process.env.CONTACT_RECEIVER_EMAIL || "tahirahmadsani@gmail.com";

    // -------------------------------------------------------------
    // TEMPLATE 1: Owner Notification Email (Delivered to Tahir)
    // -------------------------------------------------------------
    const mailOptionsOwner = {
      from: `"${from_name}" <${process.env.SMTP_USER || "tahirahmadsani@gmail.com"}>`,
      replyTo: email,
      to: ownerEmail,
      subject: `⚡ New Contact Inquiry: ${subject || "New Message"} from ${from_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b1327; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b1327; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111c35; border-radius: 24px; overflow: hidden; border: 1px solid #1d2d55; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                  <!-- Top Accent Gradient Line -->
                  <tr>
                    <td style="height: 6px; background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);"></td>
                  </tr>
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px 32px 20px 32px; text-align: left;">
                      <span style="background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(6, 182, 212, 0.3);">
                        ⚡ New Portfolio Inquiry
                      </span>
                      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 18px 0 6px 0;">
                        Message from ${from_name}
                      </h1>
                      <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                        Received via portfolio contact form.
                      </p>
                    </td>
                  </tr>
                  <!-- Visitor Details Grid -->
                  <tr>
                    <td style="padding: 0 32px 20px 32px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0d1527; border-radius: 16px; padding: 20px; border: 1px solid #1e2d4a;">
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 700; width: 100px;">Visitor Name:</td>
                          <td style="padding: 8px 0; font-size: 14px; color: #f8fafc; font-weight: 700;">${from_name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 700;">Email:</td>
                          <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 700;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 700;">Phone:</td>
                          <td style="padding: 8px 0; font-size: 14px; color: #cbd5e1;">${phone || "Not provided"}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #64748b; font-weight: 700;">Subject:</td>
                          <td style="padding: 8px 0; font-size: 14px; color: #f8fafc; font-weight: 700;">${subject || "N/A"}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Message Box -->
                  <tr>
                    <td style="padding: 0 32px 30px 32px;">
                      <p style="color: #94a3b8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">
                        Message Body:
                      </p>
                      <div style="background-color: #0f172a; padding: 22px; border-radius: 16px; border-left: 4px solid #06b6d4; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b;">${message}</div>
                    </td>
                  </tr>
                  <!-- Action Button -->
                  <tr>
                    <td style="padding: 0 32px 35px 32px; text-align: center;">
                      <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 32px; border-radius: 30px; box-shadow: 0 6px 20px rgba(6, 182, 212, 0.35);">
                        Reply to ${from_name} ➔
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // -------------------------------------------------------------
    // TEMPLATE 2: Advanced Visitor Auto-Reply Template (Delivered to Visitor)
    // -------------------------------------------------------------
    const mailOptionsAutoReply = {
      from: `"Tahir Ahmad" <${process.env.SMTP_USER || "tahirahmadsani@gmail.com"}>`,
      to: email,
      subject: `Thank you for reaching out, ${from_name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b1327; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b1327; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111c35; border-radius: 24px; overflow: hidden; border: 1px solid #1d2d55; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                  <!-- Top Accent Gradient Line -->
                  <tr>
                    <td style="height: 6px; background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);"></td>
                  </tr>
                  
                  <!-- Hero Section -->
                  <tr>
                    <td style="padding: 40px 32px 25px 32px; text-align: center;">
                      <span style="background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; font-size: 11px; font-weight: 800; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(6, 182, 212, 0.3);">
                        ⚡ Confirmation Receipt
                      </span>
                      <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 20px 0 12px 0; letter-spacing: -0.5px;">
                        Thank You for Reaching Out!
                      </h1>
                      <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0; max-width: 480px; display: inline-block;">
                        Hi <strong style="color: #22d3ee;">${from_name}</strong>, thank you for getting in touch through my portfolio. I have received your message and will review it promptly and respond to you shortly!
                      </p>
                    </td>
                  </tr>

                  <!-- Submission Summary Box -->
                  <tr>
                    <td style="padding: 0 32px 25px 32px;">
                      <div style="background-color: #0d1527; padding: 22px; border-radius: 16px; border: 1px solid #1e2d4a; border-left: 4px solid #06b6d4;">
                        <p style="color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">
                          Your Inquiry Summary:
                        </p>
                        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                          "${message}"
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Quick Reach Contact Card (Phone & Email) -->
                  <tr>
                    <td style="padding: 0 32px 30px 32px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%); border-radius: 16px; padding: 18px; border: 1px solid rgba(6,182,212,0.25);">
                        <tr>
                          <td align="center">
                            <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0 0 12px 0;">
                              Need urgent response? Reach me directly:
                            </p>
                            <table border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr>
                                <td style="padding: 0 8px;">
                                  <a href="tel:+8801610881871" style="display: inline-flex; align-items: center; gap: 8px; background-color: #06b6d4; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 800;">
                                    <img src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" width="14" height="14" style="vertical-align: middle; margin-right: 6px;" alt="Phone" />
                                    <span>+8801610881871</span>
                                  </a>
                                </td>
                                <td style="padding: 0 8px;">
                                  <a href="https://wa.me/+8801610881871/" style="display: inline-flex; align-items: center; gap: 8px; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 800;">
                                    <img src="https://img.icons8.com/color/48/whatsapp.png" width="16" height="16" style="vertical-align: middle; margin-right: 6px;" alt="WhatsApp" />
                                    <span>WhatsApp</span>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Advanced Icon Social Media Grid -->
                  <tr>
                    <td style="padding: 25px 32px 30px 32px; text-align: center; border-top: 1px solid #1d2d55;">
                      <p style="color: #f8fafc; font-size: 14px; font-weight: 800; margin: 0 0 16px 0; letter-spacing: -0.2px;">
                        Connect with me across platforms:
                      </p>
                      
                      <!-- Icon Grid Table -->
                      <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto; width: 100%;">
                        <tr>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://www.linkedin.com/in/tahirahmad01/" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/color/48/linkedin.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="LinkedIn" />
                              <span style="vertical-align: middle;">LinkedIn</span>
                            </a>
                          </td>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://github.com/TahirAhmad01" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/glyph-neue/48/ffffff/github.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="GitHub" />
                              <span style="vertical-align: middle;">GitHub</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://github.com/qubartech" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/color/48/source-code.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="QubarTech" />
                              <span style="vertical-align: middle;">QubarTech</span>
                            </a>
                          </td>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://www.messenger.com/t/tahirahmad01" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/color/48/facebook-messenger.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="Messenger" />
                              <span style="vertical-align: middle;">Messenger</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://twitter.com/tahir_ahmad01" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/color/48/twitter--v1.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="Twitter" />
                              <span style="vertical-align: middle;">Twitter / X</span>
                            </a>
                          </td>
                          <td align="center" style="padding: 6px 4px;">
                            <a href="https://www.instagram.com/tahir_ahmad01/" style="display: inline-block; padding: 10px 16px; background-color: #0d1527; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 14px; border: 1px solid #1e2d4a; width: 120px; text-align: center;">
                              <img src="https://img.icons8.com/color/48/instagram-new.png" width="18" height="18" style="vertical-align: middle; margin-right: 6px;" alt="Instagram" />
                              <span style="vertical-align: middle;">Instagram</span>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Advanced Signature Footer -->
                  <tr>
                    <td style="padding: 24px 32px; background-color: #0d1527; text-align: center; border-top: 1px solid #1d2d55;">
                      <p style="color: #64748b; font-size: 12px; margin: 0 0 4px 0;">Warm regards,</p>
                      <p style="color: #22d3ee; font-size: 16px; font-weight: 800; margin: 0;">Tahir Ahmad</p>
                      <p style="color: #94a3b8; font-size: 12px; font-weight: 600; margin: 2px 0 6px 0;">Software Engineer & Full-Stack Developer</p>
                      <p style="color: #64748b; font-size: 11px; margin: 0;">
                        📞 <a href="tel:+8801610881871" style="color: #38bdf8; text-decoration: none;">+8801610881871</a> &nbsp;|&nbsp; ✉️ <a href="mailto:tahirahmadsani@gmail.com" style="color: #38bdf8; text-decoration: none;">tahirahmadsani@gmail.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Send both owner notification and visitor auto-reply in parallel
    await Promise.all([
      transporter.sendMail(mailOptionsOwner),
      transporter.sendMail(mailOptionsAutoReply),
    ]);

    return res.status(200).json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("SMTP Error:", error);
    return res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
}
