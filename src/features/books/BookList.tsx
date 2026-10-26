import { useCallback, useMemo } from 'react'
import { Empty } from 'antd'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useDebounce } from '../../hooks/useDebounce'
import { useFilterStore } from '../filter/filterStore'
import { borrowBook, returnBook } from './booksSlice'
import { matchKeyword } from './bookUtils'
import BookItem from './BookItem'

function BookList() {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.items)
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds)

  const keyword = useFilterStore((s) => s.keyword)
  const category = useFilterStore((s) => s.category)
  const debouncedKeyword = useDebounce(keyword, 300)

  const filteredBooks = useMemo(
    () =>
      books.filter(
        (b) => (category === 'ALL' || b.category === category) && matchKeyword(b, debouncedKeyword),
      ),
    [books, category, debouncedKeyword],
  )

  const borrowedSet = useMemo(() => new Set(borrowedIds), [borrowedIds])

  const handleBorrow = useCallback((id: string) => dispatch(borrowBook(id)), [dispatch])
  const handleReturn = useCallback((id: string) => dispatch(returnBook(id)), [dispatch])

  if (filteredBooks.length === 0) {
    return <Empty description="Không tìm thấy sách phù hợp." />
  }

  return (
    <ul className="book-grid">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedSet.has(book.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </ul>
  )
}

export default BookList
