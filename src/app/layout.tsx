import "~/styles/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
// components
import Header from "~/components/organisms/header/Header";
import { Toaster } from "~/components/organisms/toast/Toast";
// utils
import TanstackQueryProvider from "~/components/organisms/tanstackQueryProvider/TanstackQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  // description: "Tic Tac Toe game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body
          className={`flex flex-col items-center font-sans ${inter.variable} min-h-screen bg-gradient-to-br from-slate-500 to-slate-300 bg-no-repeat text-zinc-950`}
        >
          <Header />
          {children}
          <Toaster />
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
