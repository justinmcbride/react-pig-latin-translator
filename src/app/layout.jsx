import '@/globals.css'

export const metadata = {
  title: "Pig Latin Translator",
  description: "A web application that translates English text into Pig Latin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}