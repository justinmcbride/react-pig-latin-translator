import type { Metadata } from "next";
import { CreditsFooter } from "@/components/CreditsFooter";
import "@/globals.css";
import { GitHubLink } from "@/components/GitHubLink";

export const metadata: Metadata = {
  title: "Pig Latin Translator",
  description: "A web application that translates English text into Pig Latin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center text-[pink] bg-[#282c34]">
        {children}
        <div className="flex grow" />
        <CreditsFooter />
        <GitHubLink />
      </body>
    </html>
  );
}
