// app/api/send-email/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(req: NextRequest) {
  const { email, fullName } = await req.json();

  try {
    const result = await emailjs.send(
        process.env.EMAIL_SERVICE_ID!,
        process.env.EMAIL_TEMPLATE_ID!,
        {
          to_email: email,
          message: `Welcome ${fullName}!`,
        },
        {
          publicKey: process.env.EMAIL_PUBLIC_KEY!,
          privateKey: process.env.EMAIL_PRIVATE_KEY!,
        }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("EmailJS failed:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
