'use server'

import {db} from "@/database/drizzle";
import {books, borrowRecords, users} from "@/database/schema";
import {and, eq} from "drizzle-orm";
import dayjs from "dayjs";
import {workflowClient} from "@/lib/workflow";

export const borrowBook = async(params: BorrowBookParams) => {
    const { bookId, userId } = params;
    try{
        const book = await db
            .select({availableCopies : books.availableCopies})
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1)
        if( !book.length || book[0].availableCopies <= 0 ) return {
            success: false,
            message: 'Book is not available!'
        }
        const dueDate = dayjs().add(7, 'day').toDate().toDateString();

        const alreadyBorrowed = await db
            .select()
            .from(borrowRecords)
            .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)))
            .limit(1)

        console.log('RecordCHeckBorrowedBook:', alreadyBorrowed)

        if(alreadyBorrowed.length > 0) {
            return {
                success: false,
                message: 'You have already borrowed this book!',
            }

        }else{
            const result = await db.insert(borrowRecords).values({
                userId,
                bookId,
                dueDate,
                status: 'BORROWED'
            })

            console.log('Record:', result)

            await db.update(books).set({availableCopies: book[0].availableCopies -1}).where(eq(books.id, bookId))

            const borrowedBookDetails = await db
                .select()
                .from(borrowRecords)
                .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)))
                .limit(1)

            console.log('BorrowedBookDetails:', borrowedBookDetails[0])

            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.id, userId))
                .limit(1)

            const [bookTitle] = await db
                .select({title: books.title})
                .from(books)
                .where(eq(books.id, bookId))
                .limit(1)

            const borrowDate = dayjs(borrowedBookDetails[0].borrowDate).format('DD MMMM YYYY')
            const dueDate = dayjs(borrowedBookDetails[0].dueDate).format('DD MMMM YYYY')

            await workflowClient.trigger({
                url: `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENTPOINT}api/auth/workflows/onboarding`,
                body: {
                    email: user.email,
                    fullName: user.fullName,
                    title: bookTitle.title,
                    borrowDate,
                    dueDate,
                    emailType: 'borrowedBook'
                }
            })
            console.log('pushEmail')

            return {
                success: true,
                data: borrowedBookDetails[0],
                alreadyBorrowed: true
            }
        }
    }catch(error) {
        console.log(error)
        return {
            success: false,
            message: 'An error occur while borrowing the book!',
            alreadyBorrowed: false
        }
    }
}


export const checkBorrowedBook = async(userId: string) => {
    const res = await db
        .select()
        .from(borrowRecords)
        .where(eq(borrowRecords.userId, userId))
    console.log('BorrowTriggerUser:', res)
    return res;
}
