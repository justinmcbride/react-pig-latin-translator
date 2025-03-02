import "@/globals.css";
import { CreditsFooter } from "@/components/CreditsFooter";
export const metadata = {
  title: "Pig Latin Translator",
  description: "A web application that translates English text into Pig Latin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col  items-center text-[pink] bg-[#282c34]">
        {children}
        <div className="flex grow" />
        <CreditsFooter />
      </body>
    </html>
  );
}
