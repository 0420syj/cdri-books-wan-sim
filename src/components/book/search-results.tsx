import type { BookDocument, BookSearchResponse } from "@/lib/api/book";
import NoResult from "@/components/book/no-result";
import Image from "next/image";
import { Body2, Caption, Small, Title3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Icon } from "../ui/icon";
import { useState, useEffect } from "react";
import Link from "next/link";

// HTML 엔티티 디코딩 함수
const decodeHtmlEntities = (text: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${text}`,
    "text/html"
  );
  return dom.body.textContent || "";
};

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
  isWished: boolean;
  onToggleWish: () => void;
}

const WISHLIST_KEY = "wishlist-books";

const BookCard = ({
  book,
  isLastBook,
  lastBookRef,
  isOpen,
  onToggle,
  isWished,
  onToggleWish,
}: BookCardProps) => {
  const { thumbnail, title, authors, price, sale_price, isbn, contents } = book;

  return (
    <div
      key={`${book.isbn}-${isLastBook ? 1 : 0}`}
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
                className="absolute z-10 text-2xl cursor-pointer select-none top-2 right-4"
                aria-label="찜하기"
                onClick={onToggleWish}
              >
                <Icon
                  icon={isWished ? "like-fill" : "like-line"}
                  size={isOpen ? 24 : 16}
                />
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
            <div className="flex-1 min-w-0 flex flex-col justify-between h-[280px]">
              <div>
                <div className="flex items-center gap-2">
                  <Title3 className="text-text-primary line-clamp-1">
                    {title}
                  </Title3>
                  <Body2 className="text-text-secondary line-clamp-1">
                    {authors.join(", ")}
                  </Body2>
                </div>
              </div>
              <div className="mt-4">
                <Body2 className="mb-2 font-bold text-text-primary">
                  책 소개
                </Body2>
                <Small className="whitespace-pre-line text-text-primary">
                  {decodeHtmlEntities(contents)}
                </Small>
              </div>
            </div>
            <div className="flex flex-col justify-between h-[280px] items-end min-w-[180px]">
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
              <div className="flex flex-col items-end w-full gap-2">
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
                <Link
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[238px] h-12 mt-2 bg-palette-primary rounded-lg hover:bg-palette-primary-hover hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <Caption className="text-palette-white">구매하기</Caption>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Title3 className="text-text-primary line-clamp-1">
                  {title}
                </Title3>
                <Body2 className="text-text-secondary line-clamp-1">
                  {authors.join(", ")}
                </Body2>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
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
                <Link
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[115px] h-12 bg-palette-primary rounded-lg hover:bg-palette-primary-hover hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <Caption className="text-palette-white">구매하기</Caption>
                </Link>
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
            </div>
          </>
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
  const [wishList, setWishList] = useState<BookDocument[]>([]);

  // localStorage에서 찜 목록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      setWishList(JSON.parse(stored));
    }
  }, []);

  // 찜 추가/삭제
  const handleToggleWish = (book: BookDocument) => {
    setWishList((prev) => {
      const exists = prev.some((b) => b.isbn === book.isbn);
      let next;
      if (exists) {
        next = prev.filter((b) => b.isbn !== book.isbn);
      } else {
        next = [book, ...prev];
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (!data?.pages[0]?.documents.length) {
    return <NoResult message="검색된 결과가 없습니다." />;
  }

  const books = data.pages.flatMap((page) => page.documents);
  const totalBooks = books.length;

  return (
    <div className="divide-y">
      {books.map((book, index) => {
        const isWished = wishList.some((b) => b.isbn === book.isbn);
        return (
          <BookCard
            key={`${book.isbn}-${index}`}
            book={book}
            isLastBook={index === totalBooks - 1}
            lastBookRef={lastBookRef}
            isOpen={openIsbn === book.isbn}
            onToggle={() =>
              setOpenIsbn(openIsbn === book.isbn ? null : book.isbn)
            }
            isWished={isWished}
            onToggleWish={() => handleToggleWish(book)}
          />
        );
      })}

      {isFetchingNextPage && (
        <div className="py-4 text-center text-gray-600">로딩 중...</div>
      )}
    </div>
  );
}
