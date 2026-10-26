import { CATEGORIES } from '../../types/book'
import type { CategoryFilter } from '../../types/book'
import { useFilterStore } from './filterStore'

const options: { value: CategoryFilter; label: string }[] = [
  { value: 'ALL', label: 'Tất cả' },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
]

function FilterBar() {
  const keyword = useFilterStore((s) => s.keyword)
  const category = useFilterStore((s) => s.category)
  const setKeyword = useFilterStore((s) => s.setKeyword)
  const setCategory = useFilterStore((s) => s.setCategory)

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="search-input"
        placeholder="Tìm theo tên sách hoặc tác giả..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="category-tabs">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={opt.value === category ? 'tab active' : 'tab'}
            onClick={() => setCategory(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
