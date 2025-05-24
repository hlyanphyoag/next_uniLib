import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'

const BookCard = ({
    id,
    title,
    genre,
    coverUrl,
    coverColor,
    isLoanedBook = false
} : Book ) => {
    console.log('Url', coverUrl)
  return (
    <li className={cn(isLoanedBook && 'xs:max-w-52 w-full')}>
        <Link href = {`/book/${id}`} className={cn(isLoanedBook && 'flex flex-col items-center w-full')}>
            <BookCover coverColor={coverColor} coverImage={coverUrl} />

            <div className={cn('mt-4', !isLoanedBook && 'xs:max-w-40 max-w-28')}>
                <p className='book-title'>{title}</p>
                <p className='book-genre'>{genre}</p>
            </div>

            {isLoanedBook && (
                <div className='w-full mt-3'>
                   <div className='book-loaned'>
                        <Image
                            src = '/icons/calendar.svg'
                            height={24}
                            width={24}
                            alt='loaned book'
                            className='object-contain'
                        />
                        <p className='text-light-100'>11 days left to return</p>
                   </div>
                   <Button variant='ghost' className='book-btn font-medium uppercase'>
                        Download receipt
                   </Button>
                </div>
            )}
        </Link>
    </li>
  )
}

export default BookCard