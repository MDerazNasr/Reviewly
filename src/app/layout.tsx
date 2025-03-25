import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { LanguageProvider } from "@/context/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Active Health Institute - Review",
  description: "Share your feedback about your experience at Active Health Institute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ClientBody>
    </html>
  );
}
