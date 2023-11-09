import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import RootNav from "@/components/nav/root-nav";
import { ThemeProvider } from "@/provider/theme-provider";

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
          <div className="p-6">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
