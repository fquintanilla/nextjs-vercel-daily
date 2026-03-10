// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getPublicationConfig } from "@/lib/server/vercel-daily-api";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPublicationConfig();

  if (!config?.seo) {
    return {
      title: {
        default: "The Vercel Daily Project",
        template: "%s • The Vercel Daily Project",
      },
      description: "News and insights for modern web developers.",
    };
  }

  const { defaultTitle, titleTemplate, defaultDescription } = config.seo;

  return {
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: defaultDescription,
  };
}

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
