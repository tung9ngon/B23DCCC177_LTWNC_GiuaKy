import { memo } from 'react'
import { Button, Card, Tag, Typography } from 'antd'
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
    <li>
      <Card size="small" className={outOfStock ? 'book-card out' : 'book-card'}>
        <Typography.Title level={3} className="book-title">
          {book.title}
        </Typography.Title>
        <Typography.Text type="secondary" italic>
          {book.author}
        </Typography.Text>
        <div className="book-meta">
          <Tag>{book.category}</Tag>
          <Typography.Text type="secondary">Năm XB: {book.year}</Typography.Text>
        </div>
        <Typography.Text type={outOfStock ? 'danger' : undefined}>Còn lại: {book.available} bản</Typography.Text>

        {isBorrowed ? (
          <Button onClick={() => onReturn(book.id)}>Trả</Button>
        ) : (
          <Button type="primary" disabled={outOfStock} onClick={() => onBorrow(book.id)}>
            Mượn
          </Button>
        )}
      </Card>
    </li>
  )
}

export default memo(BookItem)
