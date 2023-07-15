/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import { Providers } from "@/redux/provider";
import Layout from "@/components/Layout";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Login from "@/components/Login";
import TProviders from "./providers";

export const metadata = {
  title: "ChatGPT",
  description: "ChatGPT clone built by Mohamed Mourouh",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased  dark:bg-chat-gray-user "}>
        <SessionProvider session={session}>
          <TProviders>
            <Providers>
              {!session ? (
                <Login />
              ) : (
                <>
                  <Layout />
                  {children}
                </>
              )}
            </Providers>
          </TProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
