import { makeStore } from '../../app/store'
import { borrowBook, initialState } from './booksSlice'
import type { Book } from '../../types/book'

const books: Book[] = ['B1', 'B2', 'B3', 'B4'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2020,
  available: 1,
}))

it('chặn mượn cuốn thứ 4 và hiện cảnh báo', () => {
  const store = makeStore({ books: { ...initialState, items: books, status: 'succeeded' } })

  store.dispatch(borrowBook('B1'))
  store.dispatch(borrowBook('B2'))
  store.dispatch(borrowBook('B3'))
  store.dispatch(borrowBook('B4'))

  const state = store.getState().books
  expect(state.borrowedIds).toEqual(['B1', 'B2', 'B3'])
  expect(state.items[3].available).toBe(1)
  expect(state.warning).not.toBeNull()
})
