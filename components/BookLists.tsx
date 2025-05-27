import React from 'react'
import BookCard from './BookCard'

interface Props {
  title: string,
  books: Book[],
  containerClassName?: string
}

const BookLists = ({title, books, containerClassName} : Props) => {
  return (
    <section className={containerClassName}>
        <h2 className='font-bebas-neue text-4xl text-light-100 font-medium uppercase'>{title}</h2>

        <ul className='book-list'>
           {books.map((book) => (
              <BookCard key={book.title} {...book} />
              
           ))}
        </ul>
    </section>
  )
}

export default BookLists