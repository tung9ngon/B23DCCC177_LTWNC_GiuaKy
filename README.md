# Mini Library

Bài kiểm tra giữa kỳ LTWNC (RIPT1411-20261-02) - B23DCCC177

Ứng dụng tra cứu và mượn/trả sách cho thư viện khoa.

## Chạy project

```bash
npm install
npm run dev      # chạy app
npm test         # chạy test
npm run build    # build production
```

Muốn thử trường hợp API lỗi thì mở app với `?fail=1`, ví dụ `http://localhost:2005/?fail=1`.

## Cấu trúc thư mục

```
src/
  api/booksApi.ts          API giả lập (setTimeout 500ms)
  app/                     store, typed hooks
  context/                 ThemeContext + ThemeProvider
  hooks/                   useDebounce, useTheme
  features/
    books/                 booksSlice, middleware giới hạn mượn, BookItem, BookList...
    filter/                store Zustand cho từ khoá + thể loại
    stats/                 trang thống kê (lazy load)
  pages/HomePage.tsx
  types/book.ts
```
