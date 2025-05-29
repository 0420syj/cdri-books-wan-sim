"use client";

import { useEffect, useState } from "react";
import { SearchResults } from "@/components/book/search-results";
import NoResult from "@/components/book/no-result";
import type { BookDocument } from "@/lib/api/book";
import { SearchCount } from "@/components/book/search-count";

const WISHLIST_KEY = "wishlist-books";

export default function BookWishlistPage() {
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      setBooks(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">내가 찜한 책</h1>
      {loaded ? (
        <>
          <SearchCount
            totalCount={books.length}
            hasSearched={true}
            label="찜한 책"
          />
          {books.length > 0 ? (
            <SearchResults
              data={{
                pages: [
                  {
                    documents: books,
                    meta: {
                      total_count: books.length,
                      pageable_count: books.length,
                      is_end: true,
                    },
                  },
                ],
              }}
              lastBookRef={() => {}}
              isFetchingNextPage={false}
              hasSearched={true}
            />
          ) : (
            <NoResult message="찜한 책이 없습니다." />
          )}
        </>
      ) : null}
    </div>
  );
}
