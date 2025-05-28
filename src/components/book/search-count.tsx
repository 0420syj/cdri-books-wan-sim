import { Caption } from "@/components/ui/typography";

interface SearchCountProps {
  totalCount: number;
  hasSearched: boolean;
}

export function SearchCount({ totalCount, hasSearched }: SearchCountProps) {
  return (
    <div className="flex flex-row gap-4">
      <Caption className="text-text-primary">도서 검색 결과</Caption>
      <div className="flex">
        <Caption className="text-text-primary">총&nbsp;</Caption>
        <Caption className="text-palette-primary">
          {totalCount.toLocaleString()}
        </Caption>
        <Caption className="text-text-primary">건</Caption>
      </div>
    </div>
  );
}
