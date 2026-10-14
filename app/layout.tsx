import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Esmeralda Amado | Software & Embedded Systems",
  description:
    "Engineering portfolio for Esmeralda Amado, focused on embedded systems, autonomous systems, AI, robotics, and aerospace software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
