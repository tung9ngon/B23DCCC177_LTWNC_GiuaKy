import { Alert, Button, Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearWarning, loadBooks } from '../features/books/booksSlice'
import BookList from '../features/books/BookList'
import BorrowedPanel from '../features/books/BorrowedPanel'
import FilterBar from '../features/filter/FilterBar'

function HomePage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.books.status)
  const error = useAppSelector((state) => state.books.error)
  const warning = useAppSelector((state) => state.books.warning)

  if (status === 'idle' || status === 'loading') {
    return <Spin className="loading" description="Đang tải..." />
  }

  if (status === 'failed') {
    return (
      <Alert
        className="alert"
        type="error"
        showIcon
        title={error}
        action={<Button onClick={() => dispatch(loadBooks())}>Thử lại</Button>}
      />
    )
  }

  return (
    <>
      {warning && (
        <Alert
          className="alert"
          type="warning"
          showIcon
          role="alert"
          title={warning}
          closable={{ onClose: () => dispatch(clearWarning()), 'aria-label': 'Đóng' }}
        />
      )}
      <div className="home-layout">
        <section>
          <FilterBar />
          <BookList />
        </section>
        <BorrowedPanel />
      </div>
    </>
  )
}

export default HomePage
