import { signOut } from '@/auth'
import BookLists from '@/components/BookLists'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <>
        <form
            action={async() => {
                'use server'
                await signOut()
            }}
            className='mb-10'
        >
            <Button>Logout</Button>
        </form>

        <BookLists title='Borrowed Book' books={sampleBooks}/>
    </>
  )
}

export default page