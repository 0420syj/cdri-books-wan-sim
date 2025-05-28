import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "CERTICOS BOOKS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
