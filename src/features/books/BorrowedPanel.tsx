import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { MAX_BORROW, returnBook } from './booksSlice'

function BorrowedPanel() {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.items)
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds)

  const borrowedBooks = useMemo(
    () => books.filter((b) => borrowedIds.includes(b.id)),
    [books, borrowedIds],
  )

  return (
    <aside className="borrowed-panel">
      <h2>
        Sách đang mượn ({borrowedIds.length}/{MAX_BORROW})
      </h2>
      {borrowedBooks.length === 0 ? (
        <p className="empty-text">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <ul>
          {borrowedBooks.map((b) => (
            <li key={b.id}>
              <span>{b.title}</span>
              <button className="btn btn-outline btn-sm" onClick={() => dispatch(returnBook(b.id))}>
                Trả
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default BorrowedPanel
