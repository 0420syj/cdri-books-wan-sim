import type { BookDocument, BookSearchResponse } from "@/lib/api/book";
import NoResult from "@/components/book/no-result";
import Image from "next/image";
import { Body2, Caption, Small, Title3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Icon } from "../ui/icon";
import { useState } from "react";

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
  isOpen: boolean;
  onToggle: () => void;
}

const BookCard = ({
  book,
  isLastBook,
  lastBookRef,
  isOpen,
  onToggle,
}: BookCardProps) => {
  const { thumbnail, title, authors, price, sale_price, isbn, contents } = book;

  return (
    <div
      key={isbn}
      ref={isLastBook ? lastBookRef : null}
      className={`transition-all duration-300 border-b bg-white ${
        isOpen ? "shadow-lg py-8" : "py-4"
      }`}
    >
      <div className={isOpen ? "flex gap-8" : "flex items-center gap-6"}>
        <div
          className={`relative flex-shrink-0 ${
            isOpen ? "w-[210px] h-[280px]" : "w-20 h-28"
          }`}
        >
          {thumbnail ? (
            <>
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-contain rounded"
                sizes={isOpen ? "210px" : "80px"}
              />
              <button
                type="button"
                className="absolute z-10 text-2xl select-none top-1 right-1"
                aria-label="찜하기"
              >
                <Icon icon="like-line" size={isOpen ? 24 : 16} />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Body2 className="text-text-secondary">이미지 없음</Body2>
            </div>
          )}
        </div>

        {isOpen ? (
          <>
            <div className="flex flex-col justify-start flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Title3 className="text-text-primary line-clamp-1">
                  {title}
                </Title3>
                <Body2 className="text-text-secondary line-clamp-1">
                  {authors.join(", ")}
                </Body2>
              </div>
              <div className="mt-4">
                <Body2 className="font-bold text-text-primary">책 소개</Body2>
                <Small className="whitespace-pre-line text-text-primary">
                  {contents}
                </Small>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-[180px]">
              <Button
                className="w-[115px] h-12 flex items-center gap-1 bg-palette-light-gray rounded-lg hover:bg-palette-light-gray-hover hover:opacity-80 transition-opacity"
                onClick={onToggle}
              >
                <Caption className="text-text-secondary">상세보기</Caption>
                <Icon
                  icon="arrow-down"
                  size={18}
                  className="transition-transform duration-200 rotate-180"
                />
              </Button>
              <div className="flex flex-row items-center gap-1">
                <Small className="text-text-subtitle">원가</Small>
                <Title3
                  className={`text-text-primary ${
                    sale_price && sale_price > 0
                      ? "line-through font-[350]"
                      : ""
                  }`}
                >
                  {price.toLocaleString()}원
                </Title3>
              </div>
              {sale_price && sale_price > 0 && (
                <div className="flex flex-row items-center gap-1">
                  <Small className="text-text-subtitle">할인가</Small>
                  <Title3 className="text-text-primary">
                    {sale_price.toLocaleString()}원
                  </Title3>
                </div>
              )}
              <Button
                className="w-[238px] h-12 bg-palette-primary rounded-lg hover:bg-palette-primary-hover hover:opacity-80 transition-opacity"
                onClick={() => {
                  /* 구매 로직 */
                }}
              >
                <Caption className="text-palette-white">구매하기</Caption>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-end flex-1 min-w-0 gap-2">
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
            <Button
              className="w-[115px] h-12 bg-palette-primary rounded-lg hover:bg-palette-primary-hover hover:opacity-80 transition-opacity"
              onClick={() => {
                /* 구매 로직 */
              }}
            >
              <Caption className="text-palette-white">구매하기</Caption>
            </Button>
            <Button
              className="w-[115px] h-12 flex items-center gap-1 bg-palette-light-gray rounded-lg hover:bg-palette-light-gray-hover hover:opacity-80 transition-opacity"
              onClick={onToggle}
            >
              <Caption className="text-text-secondary">상세보기</Caption>
              <Icon
                icon="arrow-down"
                size={18}
                className="transition-transform duration-200"
              />
            </Button>
          </div>
        )}
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
  const [openIsbn, setOpenIsbn] = useState<string | null>(null);

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
          isOpen={openIsbn === book.isbn}
          onToggle={() =>
            setOpenIsbn(openIsbn === book.isbn ? null : book.isbn)
          }
        />
      ))}

      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-600">로딩 중...</div>
      )}
    </div>
  );
}
