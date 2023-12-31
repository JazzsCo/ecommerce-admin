import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/provider/theme-provider";
import StoreModalProvider from "@/provider/store-modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Store",
  description: "Create and sell products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
