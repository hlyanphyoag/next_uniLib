import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";
import emailjs from "emailjs-com";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});


export const sendEmail = async ({
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
  }

  const serviceID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY;
  try{
    console.log('Sending email...');
    // @ts-ignore
    const res = await emailjs.send(serviceID!, templateID!, template, publicKey, privateKey);
    console.log('Success:', res.text)
  }catch(error) {
    console.log('Error:', error.message)
  }
};