import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH!;
const fromPhone = process.env.TWILIO_PHONE!;

const client = twilio(accountSid, authToken);

function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone); // Indian 10-digit starting with 6-9
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    if (!isValidIndianPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const capitalized = capitalizeFirstLetter(name.trim());
    const message = `Dear ${capitalized},\nBe ready for your movie!\nBe at the theatre in 3 hours 😉\n(Only if BookMyShow had me in their team, they would have had this feature long ago.)`;

    const twilioRes = await client.messages.create({
      body: message,
      from: fromPhone,
      to: `+91${phone}`,
    });

    console.log(`✅ SMS sent to: +91${phone}`, twilioRes.sid);
    return NextResponse.json({ message: 'SMS sent successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('❌ Twilio SMS Error:', err);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
