export const CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const

export type Category = (typeof CATEGORIES)[number]

export type CategoryFilter = Category | 'ALL'

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  year: number
  available: number
}

export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiFailure {
  ok: false
  error: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function isApiSuccess<T>(res: ApiResponse<T>): res is ApiSuccess<T> {
  return res.ok
}
