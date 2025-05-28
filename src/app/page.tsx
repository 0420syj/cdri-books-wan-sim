import { Button } from "@/components/ui/button";
import { Caption, Title2 } from "@/components/ui/typography";
import BookSearchResult from "./_components/book-search-result";

export default function BookSearchPage() {
  return (
    <div className="p-4">
      <Title2 className="text-[#1A1E27]">도서 검색</Title2>
      <div className="flex gap-4">
        <input placeholder="검색어를 입력하세요" />
        <Button />
      </div>
      <div>
        <Caption className="text-text-primary">도서 검색 결과</Caption>
        <div className="flex">
          <Caption className="text-text-primary">총&nbsp;</Caption>
          <Caption className="text-palette-primary">0</Caption>
          <Caption className="text-text-primary">건</Caption>
        </div>
      </div>
      <BookSearchResult />
    </div>
  );
}
