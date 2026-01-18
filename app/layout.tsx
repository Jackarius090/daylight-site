import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daylight time",
  description: "Site to see the length of the day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
