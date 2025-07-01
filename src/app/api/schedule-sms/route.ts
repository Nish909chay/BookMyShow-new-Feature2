import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }
    if (!isValidIndianPhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number. Please enter a valid 10-digit Indian mobile number.' }, { status: 400 });
    }
    const sendAt = Date.now() + 60 * 1000; // 1 minute in the future
    const job = { name, phone, sendAt };
    await redis.rpush('sms-queue', JSON.stringify(job));
    return NextResponse.json({ message: 'SMS scheduled successfully.' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to schedule SMS.' }, { status: 500 });
  }
}
