# Email Setup for Magic Links

This application uses **Resend** to send magic link emails for passwordless authentication.

## 🚀 Quick Setup

### 1. Get Resend API Key

1. Sign up at [Resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the API key

### 2. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXTAUTH_URL=http://localhost:3003
```

### 3. Restart the Development Server

```bash
npm run dev
```

## 📧 Email Features

### What the Email Contains:
- ✨ Professional HTML email template
- 🔗 Clickable magic link button
- ⏰ Expiration time (15 minutes)
- 🔒 Security notice
- 📱 Mobile-friendly design

### Email Template Preview:
```
🚀 Shipcheck

Your Magic Link is Ready!
Click the button below to instantly sign in to your account

[Sign In to Shipcheck]

⏰ This link expires in 15 minutes
For your security, this magic link can only be used once.

🔒 Security Notice:
If you didn't request this magic link, you can safely ignore this email.
```

## 🧪 Testing

### Without Email Service (Demo Mode)
If `RESEND_API_KEY` is not set, the system will:
- Log the magic link to console
- Return the link in the API response (development only)
- Show fallback behavior

### With Email Service
When `RESEND_API_KEY` is configured:
- Sends real emails to any address
- Works with Gmail, Outlook, etc.
- Professional email from `noreply@shipcheck.dev`

## 📬 Supported Email Providers

- ✅ Gmail
- ✅ Outlook/Hotmail  
- ✅ Yahoo Mail
- ✅ Apple iCloud
- ✅ Corporate email
- ✅ Custom domains

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `NEXTAUTH_URL` | No | Base URL for magic links (defaults to localhost) |

### Customization

You can modify the email template in `src/lib/email.ts`:
- Change colors and styling
- Update logo and branding
- Modify expiration time
- Add custom content

## 🚨 Troubleshooting

### Emails Not Sending
1. Check `RESEND_API_KEY` is set correctly
2. Verify API key is active in Resend dashboard
3. Check console for error messages

### Emails Going to Spam
1. Verify sender domain is configured in Resend
2. Check SPF/DKIM records for your domain
3. Use professional email content

### Magic Link Not Working
1. Check the link expires in 15 minutes
2. Ensure `NEXTAUTH_URL` is correct
3. Verify the token wasn't already used

## 🔄 Fallback Behavior

The system gracefully handles email service failures:
- Falls back to console logging
- Still generates valid magic links
- Provides development-friendly behavior
- Shows clear error messages

## 📊 Analytics

Resend provides built-in email analytics:
- Delivery status
- Open rates
- Click tracking
- Bounce handling

Access these in your Resend dashboard.
