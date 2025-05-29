import { Title2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Caption } from "@/components/ui/typography";
import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (
    e: React.FormEvent,
    type?: "title" | "author" | "publisher",
    keyword?: string
  ) => void;
  isLoading: boolean;
}

const MAX_SEARCH_HISTORY = 8;
const SEARCH_HISTORY_KEY = "book-search-history";

const SEARCH_TYPES = [
  { label: "제목", value: "title" },
  { label: "저자명", value: "author" },
  { label: "출판사", value: "publisher" },
];

export function SearchInput({
  query,
  setQuery,
  handleSearch,
  isLoading,
}: SearchInputProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [showDetailSearch, setShowDetailSearch] = useState(false);
  const [detailType, setDetailType] = useState<
    "title" | "author" | "publisher"
  >("title");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [detailQuery, setDetailQuery] = useState("");
  const detailPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
      if (
        detailPopupRef.current &&
        !detailPopupRef.current.contains(event.target as Node)
      ) {
        setShowDetailSearch(false);
        setShowTypeOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addToSearchHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const newHistory = [
      searchTerm,
      ...searchHistory.filter((term) => term !== searchTerm),
    ].slice(0, MAX_SEARCH_HISTORY);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const removeFromSearchHistory = (searchTerm: string) => {
    const newHistory = searchHistory.filter((term) => term !== searchTerm);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    addToSearchHistory(trimmedQuery);
    handleSearch(e);
    setShowHistory(false);
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    setShowHistory(false);
  };

  const handleDetailSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDetailSearch(false);
    setShowTypeOptions(false);
    handleSearch(e, detailType, detailQuery.trim());
    setDetailQuery("");
  };

  return (
    <div className="space-y-4">
      <Title2>도서 검색</Title2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-2 sm:flex-row"
      >
        <div
          ref={wrapperRef}
          className={`flex-1 bg-[#F5F7FA] px-[10px] py-[10px] flex flex-col relative rounded-t-2xl ${
            showHistory ? "rounded-b-none" : "rounded-b-2xl"
          }`}
        >
          <div className="flex items-center">
            <Icon icon="search-box" size={30} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowHistory(true)}
              placeholder="검색어를 입력하세요"
              className="w-full px-4 py-2 rounded-b-none bg-[#F5F7FA] border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-text-subtitle text-base"
            />
          </div>
          {showHistory && (
            <div className="absolute left-0 right-0 top-full z-50 mt-0 bg-[#F5F7FA] rounded-t-none rounded-b-2xl px-4 py-4">
              {searchHistory.length > 0 ? (
                <ul className="w-full pl-10 overflow-y-auto transition-all duration-200">
                  {searchHistory.map((term) => (
                    <li
                      key={term}
                      className="flex items-center justify-between w-full mb-2 last:mb-0"
                    >
                      <button
                        type="button"
                        onClick={() => handleHistoryClick(term)}
                        className="flex-grow text-base text-left truncate cursor-pointer text-text-primary hover:underline"
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromSearchHistory(term)}
                        className="p-1 ml-2 rounded-full cursor-pointer hover:bg-gray-200"
                        aria-label="검색 기록 삭제"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Caption className="text-text-secondary">
                  검색 기록이 없습니다
                </Caption>
              )}
            </div>
          )}
        </div>
        <div className="relative flex flex-row gap-2 mt-2 sm:mt-0 sm:flex-col sm:justify-center">
          <Button
            type="button"
            className="px-5 py-[13px] bg-palette-light-gray rounded-lg hover:bg-palette-light-gray-hover hover:opacity-80 transition-opacity w-full"
            onClick={() => setShowDetailSearch((prev) => !prev)}
          >
            <Caption className="text-text-secondary">상세검색</Caption>
          </Button>
          {/* 상세검색 팝업 */}
          {showDetailSearch && (
            <div
              ref={detailPopupRef}
              className="absolute right-0 left-auto top-full z-50 mt-2 min-w-[280px] max-w-[90vw] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-w-[95px] text-base font-semibold text-gray-700"
                    onClick={() => setShowTypeOptions((prev) => !prev)}
                  >
                    {SEARCH_TYPES.find((t) => t.value === detailType)?.label}
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showTypeOptions && (
                    <div className="absolute left-0 top-full mt-1 min-w-[120px] bg-white rounded-md shadow-lg border border-gray-100 z-10">
                      {SEARCH_TYPES.filter((t) => t.value !== detailType).map(
                        (type) => (
                          <button
                            key={type.value}
                            type="button"
                            className="block w-full px-4 py-2 text-base text-left text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                            onClick={() => {
                              setDetailType(
                                type.value as "title" | "author" | "publisher"
                              );
                              setShowTypeOptions(false);
                            }}
                          >
                            {type.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={detailQuery}
                  onChange={(e) => setDetailQuery(e.target.value)}
                  placeholder="검색어 입력"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && detailQuery.trim()) {
                      e.preventDefault();
                      handleDetailSearch(e);
                    }
                  }}
                  className="flex-1 px-4 py-2 text-base bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-400"
                />
              </div>
              <Button
                type="button"
                className="w-full py-3 text-base font-semibold text-white rounded-lg bg-palette-primary hover:bg-palette-primary-hover"
                onClick={handleDetailSearch}
                disabled={!detailQuery.trim()}
              >
                검색하기
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
