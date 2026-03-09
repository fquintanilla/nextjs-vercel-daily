import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "The Vercel Daily",
    template: "%s • The Vercel Daily",
  },
  description: "News and insights for modern web developers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh bg-white text-neutral-950 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
