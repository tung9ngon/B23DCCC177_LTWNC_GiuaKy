import type { Middleware } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { borrowBook, showWarning, MAX_BORROW } from './booksSlice'

export const borrowLimitMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const { borrowedIds } = store.getState().books
    if (borrowedIds.length >= MAX_BORROW) {
      store.dispatch(showWarning(`Bạn chỉ được mượn tối đa ${MAX_BORROW} cuốn cùng lúc. Hãy trả bớt sách trước khi mượn thêm.`))
      return
    }
  }
  return next(action)
}
