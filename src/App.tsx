import { lazy, Suspense, useEffect } from 'react'
import { Button, Menu, Spin } from 'antd'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { loadBooks } from './features/books/booksSlice'
import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'

const StatsPage = lazy(() => import('./features/stats/StatsPage'))

const navItems = [
  { key: '/', label: <NavLink to="/" end>Danh sách sách</NavLink> },
  { key: '/stats', label: <NavLink to="/stats">Thống kê</NavLink> },
]

function App() {
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    // mở app với ?fail=1 để thử trường hợp API lỗi
    const shouldFail = new URLSearchParams(window.location.search).get('fail') === '1'
    dispatch(loadBooks(shouldFail))
  }, [dispatch])

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Mini Library</h1>
        <Menu className="nav" mode="horizontal" selectedKeys={[pathname]} items={navItems} />
        <Button onClick={toggleTheme}>{theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}</Button>
      </header>

      <main className="container">
        <Suspense fallback={<Spin className="loading" description="Đang tải trang..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
