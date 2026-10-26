import reducer, { borrowBook, initialState, loadBooks, returnBook } from './booksSlice'
import type { BooksState } from './booksSlice'
import type { Book } from '../../types/book'

const sampleBooks: Book[] = [
  { id: 'B001', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 2 },
  { id: 'B002', title: 'Cha giàu cha nghèo', author: 'Robert Kiyosaki', category: 'Kinh tế', year: 1997, available: 0 },
]

const loadedState: BooksState = {
  ...initialState,
  items: sampleBooks,
  status: 'succeeded',
}

describe('booksSlice reducer', () => {
  it('trả về state ban đầu', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('chuyển sang loading khi bắt đầu tải sách', () => {
    const state = reducer(initialState, loadBooks.pending('req1', undefined))
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  it('lưu danh sách sách khi tải thành công', () => {
    const state = reducer(initialState, loadBooks.fulfilled(sampleBooks, 'req1', undefined))
    expect(state.status).toBe('succeeded')
    expect(state.items).toHaveLength(2)
  })

  it('lưu thông báo lỗi khi tải thất bại', () => {
    const state = reducer(initialState, loadBooks.rejected(null, 'req1', undefined, 'Mất kết nối'))
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Mất kết nối')
  })

  it('mượn sách thì số bản còn lại giảm 1', () => {
    const state = reducer(loadedState, borrowBook('B001'))
    expect(state.items[0].available).toBe(1)
    expect(state.borrowedIds).toEqual(['B001'])
  })

  it('không cho mượn sách đã hết bản', () => {
    const state = reducer(loadedState, borrowBook('B002'))
    expect(state.items[1].available).toBe(0)
    expect(state.borrowedIds).toEqual([])
  })

  it('trả sách thì số bản còn lại tăng 1', () => {
    const borrowed = reducer(loadedState, borrowBook('B001'))
    const state = reducer(borrowed, returnBook('B001'))
    expect(state.items[0].available).toBe(2)
    expect(state.borrowedIds).toEqual([])
  })
})
