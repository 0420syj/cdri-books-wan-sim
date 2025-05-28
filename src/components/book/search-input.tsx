import { Title2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Caption } from "@/components/ui/typography";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MAX_SEARCH_HISTORY = 8;
const SEARCH_HISTORY_KEY = "book-search-history";

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
    addToSearchHistory(query);
    handleSearch(e);
    setShowHistory(false);
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    setShowHistory(false);
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
                <ul className="w-full pl-10 overflow-y-auto transition-all duration-200 max-h-40">
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
        <div className="flex flex-row gap-2 mt-2 sm:mt-0 sm:flex-col sm:justify-center">
          <Button
            type="button"
            className="px-5 py-[13px] bg-palette-light-gray rounded-lg hover:bg-palette-light-gray-hover hover:opacity-80 transition-opacity w-full"
            onClick={() => {
              // TODO: 상세검색 기능 구현
            }}
          >
            <Caption className="text-text-secondary">상세검색</Caption>
          </Button>
        </div>
      </form>
    </div>
  );
}
