import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";
import emailjs from "@emailjs/nodejs";

export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail
    = async ({
                                  email,
                                  subject,
                                  message,
                                }: {
  email: string;
  subject: string;
  message: string;
}) => {
  const template = {
    to_email: email,
    title: subject,
    message: message,
  };

  const serviceID = process.env.EMAIL_SERVICE_ID!;
  const templateID = process.env.EMAIL_TEMPLATE_ID!;
  const publicKey = process.env.EMAIL_PUBLIC_KEY!;
  const privateKey = process.env.EMAIL_PRIVATE_KEY!;

  try {
    console.log("Sending email...");
    const res = await emailjs.send(serviceID, templateID, template, {
      publicKey,
      privateKey,
    });
    console.log("Success:", res.text);
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
  }
};
