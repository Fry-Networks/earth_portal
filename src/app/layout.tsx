import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fry Foundation | Soil Portal",
  description: "Connect Your Wallet and Soil Miner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
