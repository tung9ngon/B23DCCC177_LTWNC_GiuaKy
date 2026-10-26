import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchBooks } from '../../api/booksApi'
import { isApiSuccess } from '../../types/book'
import type { Book } from '../../types/book'

export const MAX_BORROW = 3

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface BooksState {
  items: Book[]
  borrowedIds: string[]
  status: LoadStatus
  error: string | null
  warning: string | null
}

export const initialState: BooksState = {
  items: [],
  borrowedIds: [],
  status: 'idle',
  error: null,
  warning: null,
}

export const loadBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/load',
  async (shouldFail, { rejectWithValue }) => {
    const res = await fetchBooks(shouldFail)
    if (!isApiSuccess(res)) {
      return rejectWithValue(res.error)
    }
    return res.data
  },
  {
    // StrictMode chạy effect 2 lần, tránh gọi API trùng
    condition: (_, { getState }) => {
      const { books } = getState() as { books: BooksState }
      return books.status !== 'loading'
    },
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((b) => b.id === action.payload)
      if (!book || book.available <= 0) return
      if (state.borrowedIds.includes(book.id)) return

      book.available -= 1
      state.borrowedIds.push(book.id)
      state.warning = null
    },
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((b) => b.id === action.payload)
      if (!book || !state.borrowedIds.includes(book.id)) return

      book.available += 1
      state.borrowedIds = state.borrowedIds.filter((id) => id !== book.id)
      state.warning = null
    },
    showWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload
    },
    clearWarning(state) {
      state.warning = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Có lỗi xảy ra'
      })
  },
})

export const { borrowBook, returnBook, showWarning, clearWarning } = booksSlice.actions
export default booksSlice.reducer
