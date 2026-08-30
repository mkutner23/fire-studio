import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fire Studio",
  description: "The AI Producer. Louder. Faster. Funnier."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
