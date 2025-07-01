import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import twilio from 'twilio';

const redis = Redis.fromEnv();
const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH!;
const fromPhone = process.env.TWILIO_PHONE!;
const CRON_SECRET = process.env.CRON_SECRET!;
const client = twilio(accountSid, authToken);

function capitalizeFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function POST(req: NextRequest) {
  // 1. Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (token !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let sentCount = 0;
  try {
    // Get all jobs from the queue
    const jobs = await redis.lrange('sms-queue', 0, -1);
    const now = Date.now();
    const keepJobs: string[] = [];
    for (const jobStr of jobs) {
      const job = JSON.parse(jobStr);
      if (job.sendAt <= now) {
        try {
          const capitalized = capitalizeFirstLetter(job.name.trim());
          const message = `Dear ${capitalized},\nBe ready for your movie!\nBe at the theatre in 3 hours 😉`;
          await client.messages.create({
            body: message,
            from: fromPhone,
            to: `+91${job.phone}`,
          });
          sentCount++;
        } catch (err) {
          // If sending fails, keep in queue for retry
          keepJobs.push(jobStr);
        }
      } else {
        keepJobs.push(jobStr);
      }
    }
    // Replace the queue with only the jobs to keep
    await redis.del('sms-queue');
    if (keepJobs.length > 0) {
      await redis.rpush('sms-queue', ...keepJobs);
    }
    return NextResponse.json({ sent: sentCount });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process SMS queue.' }, { status: 500 });
  }
}
