"use client";

import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {borrowBook, checkBorrowedBook } from "@/lib/actions/book";
import {toast} from "@/hooks/toast";
import {workflowClient} from "@/lib/workflow";

interface Props {
    userId: string;
    email: string;
    fullName: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

const BorrowBook = ({
                        userId,
                        email,
                        fullName,
                        bookId,
                        borrowingEligibility: { isEligible, message },
                    }: Props) => {
    const router = useRouter();
    const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrowBook = async () => {
        if (!isEligible) {
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });

            return;
        }

        setBorrowing(true);

        try {
            const result = await borrowBook({ bookId, userId });
            const borrowedBookDetails = result.data

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Book borrowed successfully",
                });

                //send email to user after borrowing book
                await workflowClient.trigger({
                    url: `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENTPOINT}api/auth/workflows/onboarding`,
                    body: {
                        email,
                        fullName,
                        borrowDate: borrowedBookDetails?.borrowDate,
                        dueDate: borrowedBookDetails?.dueDate,
                        emailType: 'borrowedBook'
                    }
                })

                router.push("/");
            } else{
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error : any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setBorrowing(false);
        }
    };

    useEffect(() => {
        (async() => {
            const result = await checkBorrowedBook(userId);
            result.map(res => {
                if (res.bookId === bookId) {
                    setAlreadyBorrowed(true);
                }
            })
        })()
    },[])

    return (
        <Button
            className="book-overview_btn"
            onClick={handleBorrowBook}
            disabled={borrowing || alreadyBorrowed}
        >
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            {!alreadyBorrowed ? (<p className="font-bebas-neue font-normal text-lg text-dark-100">
                {borrowing ? "Borrowing ..." : "Borrow Book"}
            </p>) : (<p className="font-bebas-neue text-xl text-dark-100">Already Borrowed</p>)}
        </Button>
    );
};
export default BorrowBook;