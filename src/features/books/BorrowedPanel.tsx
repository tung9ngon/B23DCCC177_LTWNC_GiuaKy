import { useMemo } from 'react'
import { Button, Card, Empty } from 'antd'
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
    <Card
      className="borrowed-panel"
      size="small"
      title={`Sách đang mượn (${borrowedIds.length}/${MAX_BORROW})`}
    >
      {borrowedBooks.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Bạn chưa mượn cuốn nào." />
      ) : (
        <ul>
          {borrowedBooks.map((b) => (
            <li key={b.id}>
              <span>{b.title}</span>
              <Button size="small" onClick={() => dispatch(returnBook(b.id))}>
                Trả
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default BorrowedPanel
