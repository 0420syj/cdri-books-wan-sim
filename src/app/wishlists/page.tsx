import type { Metadata } from "next";
import BookWishlistPageClient from "@/components/book/book-wishlist-page-client";

export const metadata: Metadata = {
  title: "내가 찜한 책",
};

export default function BookWishlistPage() {
  return <BookWishlistPageClient />;
}
