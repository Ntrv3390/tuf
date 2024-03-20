import { Inter } from "next/font/google";
import "./globals.css";
import Navabar from "@/components/Navabar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TUF Assignment",
  description: "Made by Mohammed Puthawala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navabar />
        {children}</body>
    </html>
  );
}
