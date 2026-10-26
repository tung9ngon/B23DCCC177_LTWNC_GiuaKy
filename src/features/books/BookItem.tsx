import { memo } from 'react'
import type { Book } from '../../types/book'

interface BookItemProps {
  book: Book
  isBorrowed: boolean
  onBorrow: (id: string) => void
  onReturn: (id: string) => void
}

function BookItem({ book, isBorrowed, onBorrow, onReturn }: BookItemProps) {
  const outOfStock = book.available === 0

  return (
    <li className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <div className="book-meta">
        <span className="tag">{book.category}</span>
        <span>Năm XB: {book.year}</span>
      </div>
      <p className={outOfStock ? 'stock empty' : 'stock'}>Còn lại: {book.available} bản</p>

      {isBorrowed ? (
        <button className="btn btn-outline" onClick={() => onReturn(book.id)}>
          Trả
        </button>
      ) : (
        <button className="btn" disabled={outOfStock} onClick={() => onBorrow(book.id)}>
          Mượn
        </button>
      )}
    </li>
  )
}

export default memo(BookItem)
