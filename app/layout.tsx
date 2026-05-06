import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/app/lib/i18n";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Badugi Learning Tree",
  description:
    "A staged path from never-heard-of-it to confident Badugi player.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LocaleProvider>
          <LanguageSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
