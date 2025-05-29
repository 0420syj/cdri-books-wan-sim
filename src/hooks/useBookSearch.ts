import { useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "@/lib/api/book";
import type { BookDocument, BookSearchResponse } from "@/lib/api/book";

type InfiniteQueryData = {
  pages: BookSearchResponse[];
  pageParams: number[];
};

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<
    "title" | "person" | "publisher" | ""
  >("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<BookSearchResponse, Error, InfiniteQueryData>({
    queryKey: [
      "books",
      searchType ? `${searchType}:${searchKeyword}` : searchQuery,
    ],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({
        query: searchType ? searchKeyword.trim() : searchQuery.trim(),
        page: pageParam as number,
        size: 10,
        sort: "accuracy",
        target: searchType || undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta.is_end) return undefined;
      return allPages.length + 1;
    },
    enabled: searchType
      ? searchKeyword.trim().length > 0
      : searchQuery.trim().length > 0,
    initialPageParam: 1,
  });

  const lastBookRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage]
  );

  const handleSearch = (
    e: React.FormEvent,
    type?: "title" | "author" | "publisher",
    keyword?: string
  ) => {
    e.preventDefault();
    if (type && keyword) {
      const kakaoType = type === "author" ? "person" : type;
      setQuery("");
      setSearchQuery("");
      setSearchType(kakaoType);
      setSearchKeyword(keyword);
    } else {
      if (!query.trim()) return;
      setSearchType("");
      setSearchKeyword("");
      setSearchQuery(query);
    }
  };

  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return {
    query,
    setQuery,
    searchQuery,
    data,
    isLoading,
    error,
    isFetchingNextPage,
    lastBookRef,
    handleSearch,
    totalCount,
    searchType,
    setSearchType,
    searchKeyword,
    setSearchKeyword,
  };
}
