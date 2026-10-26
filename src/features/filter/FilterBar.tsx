import { Input, Segmented } from 'antd'
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
      <Input
        type="search"
        allowClear
        placeholder="Tìm theo tên sách hoặc tác giả..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Segmented<CategoryFilter> options={options} value={category} onChange={setCategory} />
    </div>
  )
}

export default FilterBar
