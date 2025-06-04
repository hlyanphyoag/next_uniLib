import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import emailjs from "@emailjs/nodejs";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
  emailType: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

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

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName, emailType } = context.requestPayload;

  console.log('For welcome email:', email, fullName)

  const serviceId = process.env.EMAIL_SERVICE_ID!;
  const templateId = process.env.EMAIL_TEMPLATE_ID!;
  const publicKey = process.env.EMAIL_PUBLIC_KEY!;
  const privateKey = process.env.EMAIL_PRIVATE_KEY!;
  // Welcome Email
  if(emailType === 'signup') {
    await context.run("new-signup", async () => {
      console.log('EmailJs:', emailjs)
      console.log('publicKey:', publicKey , privateKey)
      console.log('Template & Service ID:', templateId, serviceId)
      const res =await emailjs.send(serviceId, templateId, {
        to_email: email,
        title: "Welcome to the platform",
        name: fullName,
        message: `Welcome ${fullName}!`,
      }, {
        publicKey: publicKey,
        privateKey: privateKey
      });
      console.log('resEmail:', res);
    });
  }else{
    await context.run("borrowBook", async () => {
      console.log('EmailJs:', emailjs)
      console.log('publicKey:', publicKey , privateKey)
      console.log('Template & Service ID:', templateId, serviceId)
      const res =await emailjs.send(serviceId, templateId, {
        to_email: email,
        title: "Welcome to the platform",
        name: fullName,
        message: `Welcome ${fullName}!`,
      }, {
        publicKey: publicKey,
        privateKey: privateKey
      });
      console.log('BorrowedBook:', res);
    });
  }

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
       const res = await emailjs.send(serviceId, templateId, {
          to_email: email,
          title: "Are you still there?",
          name: fullName,
          message: `Hey ${fullName}, we miss you!`,
        });
        console.log('Res-Non-Active:', res)
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        const res = await emailjs.send(serviceId, templateId, {
          to_email: email,
          title: "Welcome back!",
          name: fullName,
          message: `Welcome back ${fullName}!`,
        });
        console.log('Send-Email-Actie:', res)
      });
    }
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});