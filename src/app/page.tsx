import type { Metadata } from "next";
import BookSearchPageClient from "@/components/book/book-search-page-client";

export const metadata: Metadata = {
  title: {
    absolute: "도서 검색 | CERTICOS BOOKS",
  },
};

export default function BookSearchPage() {
  return <BookSearchPageClient />;
}
