# cdri-books-wan-sim

## 🧾 프로젝트 개요

### 🧑‍💻 기술 스택
- **React.js**
- Next.js
- **TypeScript**
- **React Query**
- Storybook
- Tailwind CSS
- shadcn/ui

## ⚙️ 실행 방법 및 환경 설정

### ▶️ 실행 방법
```bash
pnpm i
pnpm dev
```

### 📕 Storybook 실행 방법
```bash
pnpm i
pnpm storybook
```

### 🛠️ 환경 설정
1. `.env` 파일을 프로젝트 루트 디렉토리에 생성합니다.
2. 이메일로 전달받은 환경 변수를 아래와 같이 추가해주세요.
```env
NEXT_PUBLIC_KAKAO_REST_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


## 🗂️ 폴더 구조 및 주요 코드 설명

### 🗃️ 폴더 구조
```bash
src/
├── app/ # Next.js App Router 엔트리 및 페이지
│ ├── page.tsx # 도서 검색 메인 페이지 (SSR)
│ └── wishlists/ 
│   └── page.tsx # 찜한 책 페이지 (SSR)
├── components/ # 재사용 가능한 컴포넌트
│ ├── book/
│ │ ├── book-search-page-client.tsx # 도서 검색 클라이언트 컴포넌트
│ │ ├── book-wishlist-page-client.tsx # 찜한 책 클라이언트 컴포넌트
│ │ ├── search-input.tsx # 검색 입력창
│ │ ├── search-count.tsx # 검색 결과/찜 개수 표시
│ │ ├── search-results.tsx # 도서 리스트
│ │ └── no-result.tsx # 결과 없음 안내
│ ├── layout/ # 레아아웃 컴포넌트
│ ├── providers/ # 프로바이더 컴포넌트
│ └── ui/ # 공통 ui 컴포넌트
├── hooks/
│ └── useBookSearch.ts # 도서 검색 관련 커스텀 훅
├── lib/
│ ├── utils.ts # tailwind 클래스 병합 유틸
│ └── api/
│   └── book.ts # 카카오 책 검색 API 연동
└── styles/
  └── globals.css # TailwindCSS 글로벌 스타일
```

### 🧠 주요 코드 설명

- **SSR/CSR 분리**  
  - `page.tsx`(서버 컴포넌트)와 `book-search-page-client.tsx`(클라이언트 컴포넌트)로 분리하여, 초기 렌더링은 서버에서, 상태/이벤트 관리는 클라이언트에서 처리합니다.
  - 찜한 책 페이지(`wishlists/page.tsx`)도 동일하게 SSR/CSR 분리 구조를 사용합니다.

- **검색 기능**  
  - `useBookSearch` 훅에서 검색어, 결과, 상태, 무한스크롤 등 모든 검색 관련 로직을 관리합니다.
  - `search-input.tsx`에서 입력값을 관리하며, 검색 실행 시에만 trim을 적용합니다.
  - 검색 기록은 localStorage에 저장/불러오기 하며, 드롭다운 UI로 제공합니다.

- **찜(하트) 기능**  
  - 각 도서 카드의 하트 버튼 클릭 시 localStorage에 저장/삭제됩니다.
  - 찜한 책 목록은 `book-wishlist-page-client.tsx`에서 localStorage에서 불러와 렌더링합니다.

- **UI/UX**  
  - TailwindCSS로 반응형 UI를 구현하였고, 검색 결과/찜 개수, 결과 없음 안내, 상세 아코디언, 버튼 레이아웃 등 다양한 UX 개선이 적용되어 있습니다.

### 📦 라이브러리 선택 이유

#### Next.js
- SSR과 클라이언트 컴포넌트 분리가 쉬워 SEO 및 초기 로딩 속도에 유리합니다.
- App Router 구조로 페이지/레이아웃 구조가 직관적입니다.

#### Storybook
- 컴포넌트 단위 개발 및 UI 테스트가 용이합니다.

#### Tailwind CSS
- 유틸리티 클래스 기반으로 빠르고 일관된 스타일링이 가능합니다.

#### shadcn/ui
- Headless UI 컴포넌트로, 커스터마이징이 자유롭고 접근성이 뛰어납니다.
- 초기 컴포넌트 개발시 시간 단축에 용이합니다.
- Button 컴포넌트만을 사용하였습니다.

## ✨ 강조 하고 싶은 기능

### IconMapper와 Storybook을 활용한 아이콘 관리
- IconMapper에 각 아이콘명과 svg 코드를 매핑하여, 관리가 용이합니다.
- Storybook에서 빠르게 각 아이콘의 미리보기를 확인할 수 있습니다.
