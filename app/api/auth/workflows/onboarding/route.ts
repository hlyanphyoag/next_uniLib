export const config = {
  runtime: "nodejs", // ✅ Ensures compatibility with EmailJS
};

import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
      timeDifference > THREE_DAYS_IN_MS &&
      timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export async function POST(req: NextRequest) {
  const { email, fullName } = await req.json();

  const serviceId = process.env.EMAIL_SERVICE_ID!;
  const templateId = process.env.EMAIL_TEMPLATE_ID!;
  const publicKey = process.env.EMAIL_PUBLIC_KEY!;
  const privateKey = process.env.EMAIL_PRIVATE_KEY!;

  try {
    // ✅ Send welcome email
    const res = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: email,
          title: "Welcome to the platform",
          message: `Welcome ${fullName}!`,
        },
        {
          publicKey,
          privateKey,
        }
    );

    console.log("Welcome email sent:", res.status, res.text);

    // ✅ Check user state and send follow-up email immediately (for demo)
    const state = await getUserState(email);

    if (state === "non-active") {
      await sendEmail({
        email,
        subject: "Are you still there?",
        message: `Hey ${fullName}, we miss you!`,
      });
    } else if (state === "active") {
      await sendEmail({
        email,
        subject: "Welcome back!",
        message: `Welcome back ${fullName}!`,
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
