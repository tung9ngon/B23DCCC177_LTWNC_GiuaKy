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
    return <p className="loading">Đang tải...</p>
  }

  if (status === 'failed') {
    return (
      <div className="alert alert-error">
        <p>{error}</p>
        <button className="btn" onClick={() => dispatch(loadBooks())}>
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <>
      {warning && (
        <div className="alert alert-warning" role="alert">
          <span>{warning}</span>
          <button className="close-btn" onClick={() => dispatch(clearWarning())} aria-label="Đóng">
            ×
          </button>
        </div>
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
