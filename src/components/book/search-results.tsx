import type { BookDocument, BookSearchResponse } from "@/lib/api/book";
import NoResult from "@/components/book/no-result";
import Image from "next/image";
import { Body2, Caption, Title3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Icon } from "../ui/icon";

interface SearchResultsProps {
  data:
    | {
        pages: BookSearchResponse[];
      }
    | undefined;
  lastBookRef: (node: HTMLDivElement | null) => void;
  isFetchingNextPage: boolean;
  hasSearched: boolean;
}

interface BookCardProps {
  book: BookDocument;
  isLastBook: boolean;
  lastBookRef: (node: HTMLDivElement | null) => void;
}

const BookCard = ({ book, isLastBook, lastBookRef }: BookCardProps) => {
  const { thumbnail, title, authors, price, sale_price, isbn } = book;

  return (
    <div
      key={isbn}
      ref={isLastBook ? lastBookRef : null}
      className="flex items-center gap-6 p-4 transition-colors duration-200 border-b hover:bg-gray-50"
    >
      <div className="relative flex-shrink-0 w-20 h-28">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-contain"
              sizes="80px"
            />
            <button
              type="button"
              className="absolute z-10 text-2xl select-none top-1 right-1"
              onClick={() => {
                // TODO: 하트 토글 기능 구현 예정
              }}
              aria-label="찜하기"
            >
              <Icon icon="like-line" size={16} />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <Body2 className="text-text-secondary">이미지 없음</Body2>
          </div>
        )}
      </div>

      <div className="flex items-center flex-grow min-w-0 gap-8">
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <Title3 className="text-text-primary line-clamp-1">{title}</Title3>
            <Body2 className="text-text-secondary line-clamp-1">
              {authors.join(", ")}
            </Body2>
          </div>
        </div>

        <div className="flex items-center flex-shrink-0 gap-4">
          <div className="flex items-center gap-2">
            {sale_price && sale_price > 0 ? (
              <>
                <Body2 className="line-through text-text-secondary">
                  {price.toLocaleString()}원
                </Body2>
                <Title3 className="text-text-primary">
                  {sale_price.toLocaleString()}원
                </Title3>
              </>
            ) : (
              <Title3 className="text-text-primary">
                {price.toLocaleString()}원
              </Title3>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="px-5 py-[13px] bg-palette-primary rounded-lg hover:bg-palette-primary-hover hover:opacity-80 transition-opacity w-[115px] h-12"
              onClick={() => {
                // TODO
              }}
            >
              <Caption className="text-palette-white">구매하기</Caption>
            </Button>
            <button
              className="px-5 py-[13px] bg-palette-light-gray rounded-lg hover:bg-palette-light-gray-hover hover:opacity-80 transition-opacity w-[115px] h-12"
              onClick={() => {
                // TODO
              }}
            >
              <div className="flex items-center gap-1">
                <Caption className="text-text-secondary">상세보기</Caption>
                <Icon icon="arrow-down" size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SearchResults({
  data,
  lastBookRef,
  isFetchingNextPage,
  hasSearched,
}: SearchResultsProps) {
  if (!data?.pages[0]?.documents.length) {
    return <NoResult />;
  }

  const books = data.pages.flatMap((page) => page.documents);
  const totalBooks = books.length;

  return (
    <div className="divide-y">
      {books.map((book, index) => (
        <BookCard
          key={book.isbn}
          book={book}
          isLastBook={index === totalBooks - 1}
          lastBookRef={lastBookRef}
        />
      ))}

      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-600">로딩 중...</div>
      )}
    </div>
  );
}
