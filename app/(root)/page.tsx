import BookLists from "@/components/BookLists";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";


export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]}/>
      <BookLists 
        title="Latest Books"
        books = {sampleBooks}
        containerClassName = 'mt-28'
      />
    </>
  );
}
