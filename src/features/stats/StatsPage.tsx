import { useMemo } from 'react'
import { useAppSelector } from '../../app/hooks'
import { CATEGORIES } from '../../types/book'
import { countByCategory } from '../books/bookUtils'
import { MAX_BORROW } from '../books/booksSlice'

function StatsPage() {
  const books = useAppSelector((state) => state.books.items)
  const status = useAppSelector((state) => state.books.status)
  const borrowedCount = useAppSelector((state) => state.books.borrowedIds.length)

  const counts = useMemo(() => countByCategory(books), [books])

  if (status === 'idle' || status === 'loading') {
    return <p className="loading">Đang tải...</p>
  }

  return (
    <div className="stats-page">
      <h2>Thống kê thư viện</h2>

      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-label">Tổng số đầu sách</span>
          <strong>{books.length}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Sách đang mượn</span>
          <strong>
            {borrowedCount}/{MAX_BORROW}
          </strong>
        </div>
      </div>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Thể loại</th>
            <th>Số đầu sách</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map((c) => (
            <tr key={c}>
              <td>{c}</td>
              <td>{counts[c]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatsPage
