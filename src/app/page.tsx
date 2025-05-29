"use client";

import { useBookSearch } from "@/hooks/useBookSearch";
import { SearchInput } from "@/components/book/search-input";
import { SearchCount } from "@/components/book/search-count";
import { SearchResults } from "@/components/book/search-results";

export default function BookSearchPage() {
  const {
    query,
    setQuery,
    data,
    isLoading,
    error,
    isFetchingNextPage,
    lastBookRef,
    handleSearch,
    totalCount,
    searchQuery,
  } = useBookSearch();

  const hasSearched = searchQuery.trim().length > 0;

  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && (
        <div className="mb-4 text-red-500">책 검색 중 오류가 발생했습니다.</div>
      )}

      <SearchCount
        totalCount={totalCount}
        hasSearched={hasSearched}
        label="도서 검색 결과"
      />

      <SearchResults
        data={data}
        lastBookRef={lastBookRef}
        isFetchingNextPage={isFetchingNextPage}
        hasSearched={hasSearched}
      />
    </div>
  );
}
