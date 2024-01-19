import "~/styles/globals.css";

import { Inter } from "next/font/google";
// components
import Header from "~/components/organisms/header/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tic Tac Toe",
  // description: "Tic Tac Toe game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} min-h-screen bg-gradient-to-br from-slate-500 to-slate-100 bg-no-repeat text-zinc-950`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
