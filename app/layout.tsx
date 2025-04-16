// app/layout.tsx
import "../styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Finance Visualizer",
  description: "Track your income and expenses easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
