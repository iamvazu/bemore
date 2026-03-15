import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // In a real production app, you would:
    // 1. Send an email via SendGrid/Resend
    // 2. Add as a lead to HubSpot/Zoho
    // 3. Send a WhatsApp notification to the Be More team

    console.log('NEW LEAD CAPTURED:', data);

    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: "Lead captured successfully. Our design team will contact you shortly." 
    });
  } catch (error) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
