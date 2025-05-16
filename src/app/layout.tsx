import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "@/redux/ReduxWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Template",
  description: "Frontend Template description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxWrapper>
       
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${nunito.className} antialiased`}
          >
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </body>
      </ReduxWrapper>
    </html>
  );
}
