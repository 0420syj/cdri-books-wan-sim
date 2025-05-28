import { Title2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function SearchInput({
  query,
  setQuery,
  handleSearch,
  isLoading,
}: SearchInputProps) {
  return (
    <div>
      <Title2 className="text-[#1A1E27]">도서 검색</Title2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 p-2 border rounded"
          />
        </div>
      </form>
    </div>
  );
}
