// Root layout: wraps ALL pages, provides html/body structure
// Keep this minimal: no section-specific chrome here

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Foundations",
  description: "Learning Next.js patterns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Global providers would go here (theme, auth, etc.) */}
        {children}
      </body>
    </html>
  );
}
