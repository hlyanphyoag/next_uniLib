import BookLists from "@/components/BookLists";
import BookOverview from "@/components/BookOverview";
import {auth} from "@/auth";
import {db} from "@/database/drizzle";
import {desc} from "drizzle-orm";
import {books} from "@/database/schema";


export default async function Home() {
    const session = await auth();

    // @ts-ignore
    const latestBooks = await db
                                .select()
                                .from(books)
                                .limit(10)
                                .orderBy(desc(books.createdAt)) as Book[]


  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user.id}/>
      <BookLists 
        title="Latest Books"
        books = {latestBooks.slice(1)}
        containerClassName = 'mt-28'
      />
    </>
  );
}
