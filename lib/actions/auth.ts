'use server'

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";

import { eq, param } from "drizzle-orm";
import { headers } from "next/headers";
import { ratelimit } from "../ratelimit";
import { redirect } from "next/navigation";
import {workflowClient} from "@/lib/workflow";
import emailjs from '@emailjs/nodejs'

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params;

    const ip = (await headers()).get("x-forwarded-for") || '127.0.0.1'
    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return redirect('/too-fast')
    }

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        if (result?.error) {
            return { success: false, error: result.error }
        }
        return { success: true, message: 'Sign In Successful!' }
    } catch (error) {
        console.log(error);
        return { success: false, error: 'Sign in error!' }
    }
}

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params;

    const ip = (await headers()).get("x-forwarded-for") || '127.0.0.1'
    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return redirect('/too-fast')
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
        return { success: false, message: 'User already exist!' }
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
            universityId,
            universityCard
        });

        console.log('TriggerEmail:', email, fullName)
        await workflowClient.trigger({
            url: `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENTPOINT}api/auth/workflows/onboarding`,
            body: {
                email,
                fullName,
                emailType: 'signup'
            }
        })
        // await signInWithCredentials({ email, password });
        return { success: true, message: 'Sign up successful!' }
    } catch (error) {
        console.log(error);
        return { success: false, error: error }
    }
}