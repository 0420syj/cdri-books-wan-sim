export interface BookSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: BookDocument[];
}

export interface BookDocument {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface BookSearchParams {
  query: string;
  sort?: "accuracy" | "recency";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}

export async function searchBooks(
  params: BookSearchParams
): Promise<BookSearchResponse> {
  const searchParams = new URLSearchParams();

  // 필수 파라미터
  searchParams.append("query", params.query);

  // 선택적 파라미터
  if (params.sort) searchParams.append("sort", params.sort);
  if (params.page) searchParams.append("page", params.page.toString());
  if (params.size) searchParams.append("size", params.size.toString());
  if (params.target) searchParams.append("target", params.target);

  const response = await fetch(
    `https://dapi.kakao.com/v3/search/book?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("책 검색 API 호출에 실패했습니다.");
  }

  return response.json();
}
