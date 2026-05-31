import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendMagicLinkEmail } from '@/lib/email';

// Use a simple file-based storage for development persistence
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TOKENS_FILE = path.join(DATA_DIR, 'tokens.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for file-based storage
const loadTokens = () => {
  try {
    if (fs.existsSync(TOKENS_FILE)) {
      const data = fs.readFileSync(TOKENS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading tokens:', error);
  }
  return {};
};

const saveTokens = (tokens: any) => {
  try {
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return {};
};

const saveUsers = (users: any) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Load existing data
    const tokens = loadTokens();
    const users = loadUsers();

    // Store magic link
    tokens[token] = {
      email,
      name,
      expires: expires.toISOString(),
      used: false
    };
    saveTokens(tokens);

    // Create or update user
    if (!users[email]) {
      users[email] = {
        email,
        name,
        createdAt: new Date().toISOString()
      };
    } else {
      // Update name if it has changed
      users[email].name = name;
    }
    saveUsers(users);

    // Create magic link URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const magicLinkUrl = `${baseUrl}/auth/verify?token=${token}`;
    
    console.log('=== MAGIC LINK GENERATED ===');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Magic Link:', magicLinkUrl);
    console.log('Base URL:', baseUrl);
    console.log('Expires:', expires.toISOString());
    console.log('============================');

    // Send email
    const emailResult = await sendMagicLinkEmail({
      email,
      magicLink: magicLinkUrl,
      expirationMinutes: 15
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      
      // Fallback to console logging for demo if email fails
      console.log('=== MAGIC LINK GENERATED ===');
      console.log(`Email: ${email}`);
      console.log(`Magic Link: ${magicLinkUrl}`);
      console.log(`Expires: ${expires.toISOString()}`);
      console.log('Email Error:', emailResult.error);
      console.log('============================');
      
      return NextResponse.json({
        message: 'Magic link generated (email service unavailable)',
        success: false,
        // Include the link for development/demo purposes
        magicLink: magicLinkUrl,
        error: emailResult.error
      });
    }

    console.log('✅ Magic link sent successfully to:', email);

    return NextResponse.json({
      message: 'Magic link sent successfully! Check your email.',
      success: true
    });

  } catch (error) {
    console.error('Magic link generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to verify magic links (used by the verify endpoint)
export function verifyMagicLink(token: string): { email: string; name: string; valid: boolean } | null {
  const tokens = loadTokens();
  const linkData = tokens[token];
  
  if (!linkData) {
    return null;
  }

  if (linkData.used) {
    return null;
  }

  if (new Date() > new Date(linkData.expires)) {
    // Remove expired token
    delete tokens[token];
    saveTokens(tokens);
    return null;
  }

  // Mark link as used
  linkData.used = true;
  tokens[token] = linkData;
  saveTokens(tokens);
  
  return {
    email: linkData.email,
    name: linkData.name,
    valid: true
  };
}

// Export for testing purposes
export { loadTokens, saveTokens, loadUsers, saveUsers };
