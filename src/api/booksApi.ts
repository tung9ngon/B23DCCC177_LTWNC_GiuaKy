import type { ApiResponse, Book } from '../types/book'

const DELAY = 500

const mockBooks: Book[] = [
  { id: 'B001', title: 'Cấu trúc dữ liệu và giải thuật', author: 'Đỗ Xuân Lôi', category: 'CNTT', year: 2019, available: 3 },
  { id: 'B002', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 0 },
  { id: 'B003', title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', year: 1994, available: 2 },
  { id: 'B004', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'CNTT', year: 2009, available: 1 },
  { id: 'B005', title: "You Don't Know JS", author: 'Kyle Simpson', category: 'CNTT', year: 2015, available: 4 },
  { id: 'B006', title: 'Nguyên lý kinh tế học', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2014, available: 2 },
  { id: 'B007', title: 'Nhà đầu tư thông minh', author: 'Benjamin Graham', category: 'Kinh tế', year: 2006, available: 1 },
  { id: 'B008', title: 'Cha giàu cha nghèo', author: 'Robert Kiyosaki', category: 'Kinh tế', year: 1997, available: 5 },
  { id: 'B009', title: 'Marketing căn bản', author: 'Philip Kotler', category: 'Kinh tế', year: 2012, available: 0 },
  { id: 'B010', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, available: 3 },
  { id: 'B011', title: 'Minna no Nihongo Sơ cấp 1', author: '3A Corporation', category: 'Ngoại ngữ', year: 2012, available: 2 },
  { id: 'B012', title: 'Oxford Word Skills', author: 'Ruth Gairns', category: 'Ngoại ngữ', year: 2008, available: 1 },
]

export function fetchBooks(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không kết nối được tới máy chủ thư viện. Vui lòng thử lại.' })
        return
      }
      // copy ra mảng mới để không bị sửa trực tiếp vào dữ liệu gốc
      resolve({ ok: true, data: mockBooks.map((b) => ({ ...b })) })
    }, DELAY)
  })
}
