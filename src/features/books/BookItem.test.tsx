import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookItem from './BookItem'
import type { Book } from '../../types/book'

const book: Book = {
  id: 'B010',
  title: 'English Grammar in Use',
  author: 'Raymond Murphy',
  category: 'Ngoại ngữ',
  year: 2019,
  available: 3,
}

describe('BookItem', () => {
  it('hiển thị đúng thông tin sách', () => {
    render(<BookItem book={book} isBorrowed={false} onBorrow={jest.fn()} onReturn={jest.fn()} />)

    expect(screen.getByText('English Grammar in Use')).toBeInTheDocument()
    expect(screen.getByText('Raymond Murphy')).toBeInTheDocument()
    expect(screen.getByText('Ngoại ngữ')).toBeInTheDocument()
    expect(screen.getByText(/2019/)).toBeInTheDocument()
    expect(screen.getByText('Còn lại: 3 bản')).toBeInTheDocument()
  })

  it('bấm Mượn thì gọi onBorrow với đúng id', async () => {
    const user = userEvent.setup()
    const onBorrow = jest.fn()
    render(<BookItem book={book} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Mượn' }))

    expect(onBorrow).toHaveBeenCalledTimes(1)
    expect(onBorrow).toHaveBeenCalledWith('B010')
  })

  it('nút Mượn bị vô hiệu hoá khi hết bản', async () => {
    const user = userEvent.setup()
    const onBorrow = jest.fn()
    render(
      <BookItem book={{ ...book, available: 0 }} isBorrowed={false} onBorrow={onBorrow} onReturn={jest.fn()} />,
    )

    const btn = screen.getByRole('button', { name: 'Mượn' })
    expect(btn).toBeDisabled()

    await user.click(btn)
    expect(onBorrow).not.toHaveBeenCalled()
  })

  it('sách đang mượn thì hiện nút Trả', async () => {
    const user = userEvent.setup()
    const onReturn = jest.fn()
    render(<BookItem book={book} isBorrowed onBorrow={jest.fn()} onReturn={onReturn} />)

    await user.click(screen.getByRole('button', { name: 'Trả' }))
    expect(onReturn).toHaveBeenCalledWith('B010')
  })
})
