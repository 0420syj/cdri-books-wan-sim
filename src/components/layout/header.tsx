"use client";

import { Body1, Title1 } from "../ui/typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center p-4 relative">
      <div>
        <Link href="/">
          <Title1 className="text-text-primary hover:opacity-80 transition-opacity">
            CERTICOS BOOKS
          </Title1>
        </Link>
      </div>
      <div className="flex gap-6 absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <Body1
            className={`text-text-primary hover:opacity-80 transition-opacity ${
              pathname === "/" ? "border-b-2 border-palette-primary" : ""
            }`}
          >
            도서 검색
          </Body1>
        </Link>
        <Link href="/wishlists">
          <Body1
            className={`text-text-primary hover:opacity-80 transition-opacity ${
              pathname === "/wishlists"
                ? "border-b-2 border-palette-primary"
                : ""
            }`}
          >
            내가 찜한 책
          </Body1>
        </Link>
      </div>
    </header>
  );
}
