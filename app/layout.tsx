
import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local"
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ClientSessionProvider from "@/components/ClientSessionProvider";

const ibmPlexSans = localFont({
  src: [
    { path: './fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ]
});

const bebasNeue = localFont({
  src: [{ path: './fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--bebas-neue',
});

export const metadata: Metadata = {
  title: "Bookwise",
  description: "Bookwise is a university book borrowing management solution",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        <ClientSessionProvider session={session}>
          {children}
          <Toaster />
        </ClientSessionProvider>
      </body>
    </html>
  );
}

export default RootLayout
