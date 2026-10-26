import { lazy, Suspense, useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { loadBooks } from './features/books/booksSlice'
import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'

const StatsPage = lazy(() => import('./features/stats/StatsPage'))

function App() {
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    // mở app với ?fail=1 để thử trường hợp API lỗi
    const shouldFail = new URLSearchParams(window.location.search).get('fail') === '1'
    dispatch(loadBooks(shouldFail))
  }, [dispatch])

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Mini Library</h1>
        <nav className="nav">
          <NavLink to="/" end>
            Danh sách sách
          </NavLink>
          <NavLink to="/stats">Thống kê</NavLink>
        </nav>
        <button className="btn btn-outline" onClick={toggleTheme}>
          {theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
        </button>
      </header>

      <main className="container">
        <Suspense fallback={<p className="loading">Đang tải trang...</p>}>
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
