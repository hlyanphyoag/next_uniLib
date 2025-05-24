import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,

} : Book) => {

    console.log('coverUrl', coverUrl)

  return (
    <section className='book-overview'>
        <div className='flex flex-1 flex-col gap-5'>
            <h1>{title}</h1>
            <div className='book-info'>
                <p>
                    By <span className='text-light-200 font-semibold'>{author}</span>
                </p>
                <p>
                    Category {" "}
                    <span className='text-light-200 font-semibold'>{genre}</span>
                </p>

                <div className='flex flex-row gap-1'>
                    <Image
                        src='/icons/star.svg'
                        alt='star'
                        width={24}
                        height={24} 
                    /> 
                    <p>{rating}</p>
                </div>
            </div>
            <div className='book-copies'>
                    <p>
                        Total Books: <span>{totalCopies}</span>
                        
                    </p>
                    <p>
                        Available Books: <span>{availableCopies}</span>
                    </p>
            </div>

            <p className='book-description'>{description}</p>
            <Button className='book-overview_btn'>
                <Image src = '/icons/book.svg' alt='book' width={24} height={24} />
                <p className='text-lg font-semibold text-dark-100 font-bebas-neue uppercase'>Borrow</p>
            </Button>
        </div>

        <div className='relative flex flex-1 justify-center'>
            <div className='relative'>
                <BookCover 
                    variant = 'wide'
                    className = 'z-10'
                    coverColor = {coverColor}
                    coverImage = {coverUrl}
                />

                <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                    <BookCover 
                        variant = 'wide'
                        coverColor = {coverColor}
                        coverImage = {coverUrl}
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default BookOverview