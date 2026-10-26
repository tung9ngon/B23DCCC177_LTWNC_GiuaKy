import { CATEGORIES } from '../../types/book'
import type { Book, Category } from '../../types/book'

export function matchKeyword(book: Pick<Book, 'title' | 'author'>, keyword: string) {
  const q = keyword.trim().toLowerCase()
  if (!q) return true
  return book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
}

export function countByCategory(books: Book[]): Record<Category, number> {
  const result = {} as Record<Category, number>
  CATEGORIES.forEach((c) => {
    result[c] = 0
  })
  books.forEach((b) => {
    result[b.category] += 1
  })
  return result
}
