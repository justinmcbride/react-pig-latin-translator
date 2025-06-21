import type { Metadata } from "next";
import { CreditsFooter } from "@/components/CreditsFooter";
import "@/globals.css";
import { GitHubLink } from "@/components/GitHubLink";
import { FlyingPigs } from "@/components/FlyingPigs";

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
      <body className="min-h-screen flex flex-col items-center text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"></div>
        </div>
        <FlyingPigs />
        <div className="relative z-10 w-full flex flex-col items-center min-h-screen">
          {children}
          <div className="flex grow" />
          <CreditsFooter />
          <GitHubLink />
        </div>
      </body>
    </html>
  );
}
