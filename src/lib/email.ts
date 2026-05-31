import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface MagicLinkEmailProps {
  email: string;
  magicLink: string;
  expirationMinutes?: number;
}

export async function sendMagicLinkEmail({ 
  email, 
  magicLink, 
  expirationMinutes = 15 
}: MagicLinkEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Sign In to WebKit - Direct Link',
      text: `Direct Sign In Link: ${magicLink}

If the link above doesn't work, copy this URL and paste it in your browser:
${encodeURIComponent(magicLink)}

This link expires in ${expirationMinutes} minutes.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WebKit Sign In</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: #ffffff;
              border-radius: 12px;
              padding: 40px 30px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: 700;
              color: #000;
              margin-bottom: 10px;
            }
            .title {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 10px;
              color: #333;
            }
            .subtitle {
              color: #666;
              font-size: 16px;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              background-color: #000;
              color: #ffffff;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              transition: background-color 0.2s;
            }
            .button:hover {
              background-color: #333;
            }
            .info {
              background-color: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              color: #495057;
              font-size: 14px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e9ecef;
              color: #6c757d;
              font-size: 12px;
            }
            .fallback-link {
              background-color: #f1f3f4;
              border: 1px solid #dadce0;
              border-radius: 4px;
              padding: 12px;
              font-family: monospace;
              font-size: 12px;
              word-break: break-all;
              color: #5f6368;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">WebKit</div>
              <h1 class="title">Sign In to Your Account</h1>
              <p class="subtitle">Click the button below to securely sign in</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${encodeURIComponent(magicLink)}" class="button">
                Sign In to WebKit
              </a>
            </div>

            <div class="info">
              <strong>🔒 Secure Sign-In Link</strong><br>
              This link will sign you in instantly without requiring a password. It expires in ${expirationMinutes} minutes and can only be used once.
            </div>

            <div class="info" style="background-color: #fff3cd; border-color: #ffeaa7;">
              <strong>⚠️ Chrome Users - Important!</strong><br>
              Chrome may block direct links from emails. If the button doesn't work, please:
              <ol style="text-align: left; margin: 10px 0; padding-left: 20px;">
                <li>Copy the link below</li>
                <li>Open a NEW browser tab</li>
                <li>Paste the link in the address bar</li>
                <li>Press Enter to go to the link</li>
              </ol>
            </div>

            <div class="info">
              <strong>📧 Copy & Paste Method:</strong><br>
              Copy and paste this link into your browser:
              <div class="fallback-link">
                ${magicLink}
              </div>
            </div>

            <div class="footer">
              <p>WebKit - Website Audit Platform</p>
              <p style="margin-top: 8px; color: #999;">
                If you didn't request this sign-in link, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
