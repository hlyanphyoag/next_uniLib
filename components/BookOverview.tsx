import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import BorrowBook from "@/components/BorrowBook";
import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";


interface Props extends Book {
    userId: string
}
const BookOverview = async({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
    id,
    userId
} : Props) => {

    const [ user ] = await db.select().from(users).where(eq(users.id, userId)).limit(1)


    const borrowingEligibility = {
        isEligible: availableCopies > 0 && user.status === 'APPROVED',
        message: availableCopies < 0 ? 'Book is not available!' : 'You are not eligible to borrow this book!'
    }

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
            <BorrowBook userId={userId} email={user.email} fullName={user.fullName} bookId={id} borrowingEligibility = {borrowingEligibility}/>
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