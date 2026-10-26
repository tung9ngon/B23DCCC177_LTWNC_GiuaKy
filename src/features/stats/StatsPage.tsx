import { useMemo } from 'react'
import { Card, Spin, Statistic, Table, Typography } from 'antd'
import { useAppSelector } from '../../app/hooks'
import { CATEGORIES } from '../../types/book'
import { countByCategory } from '../books/bookUtils'
import { MAX_BORROW } from '../books/booksSlice'

const columns = [
  { title: 'Thể loại', dataIndex: 'category', key: 'category' },
  { title: 'Số đầu sách', dataIndex: 'count', key: 'count' },
]

function StatsPage() {
  const books = useAppSelector((state) => state.books.items)
  const status = useAppSelector((state) => state.books.status)
  const borrowedCount = useAppSelector((state) => state.books.borrowedIds.length)

  const counts = useMemo(() => countByCategory(books), [books])
  const rows = useMemo(() => CATEGORIES.map((c) => ({ category: c, count: counts[c] })), [counts])

  if (status === 'idle' || status === 'loading') {
    return <Spin className="loading" description="Đang tải..." />
  }

  return (
    <div className="stats-page">
      <Typography.Title level={2}>Thống kê thư viện</Typography.Title>

      <div className="stat-cards">
        <Card size="small" className="stat-card">
          <Statistic title="Tổng số đầu sách" value={books.length} />
        </Card>
        <Card size="small" className="stat-card">
          <Statistic title="Sách đang mượn" value={`${borrowedCount}/${MAX_BORROW}`} />
        </Card>
      </div>

      <Table
        className="stats-table"
        size="small"
        rowKey="category"
        columns={columns}
        dataSource={rows}
        pagination={false}
      />
    </div>
  )
}

export default StatsPage
