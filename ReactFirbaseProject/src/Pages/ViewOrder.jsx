import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from '../Components/Card';

function ViewOrder() {
    const firebase=useFirebase()

    const [books,setBooks] =useState([]);
    useEffect(()=>{
      if(firebase . isLoggedIn)
   firebase.fetchMyBooks(firebase.user.uid)?.then((books)=>setBooks(books.docs));

    },[firebase]);
    console.log(books);

    if(!firebase.isLoggedIn) return <h1>Please Login for order</h1>
  return (
    <div>
      {
        books.map(book=> <Card
           key={book.id}
            id={book.id} 
             {...book.data()}/>)
      }
    </div>
  )
}

export default ViewOrder