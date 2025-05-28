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
    <div className="p-4">
      <SearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && (
        <div className="text-red-500 mb-4">책 검색 중 오류가 발생했습니다.</div>
      )}

      <SearchCount totalCount={totalCount} hasSearched={hasSearched} />

      <SearchResults
        data={data}
        lastBookRef={lastBookRef}
        isFetchingNextPage={isFetchingNextPage}
        hasSearched={hasSearched}
      />
    </div>
  );
}
