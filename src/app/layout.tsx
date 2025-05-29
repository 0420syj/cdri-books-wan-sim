import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import Header from "@/components/layout/header";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CERTICOS BOOKS",
    default: "가장 빠른 도서 검색 | CERTICOS BOOKS",
  },
  description: "빠르고 정확한 도서 검색과 찜 기능을 제공하는 서비스",
  openGraph: {
    type: "website",
    title: "CERTICOS BOOKS",
    description: "빠르고 정확한 도서 검색과 찜 기능을 제공하는 서비스",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
