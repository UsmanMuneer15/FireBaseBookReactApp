import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from '../Components/Card';
import { CardGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function Home(props) {
  const firebase = useFirebase();

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(3); // Number of books to display per page
  const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
    firebase.listAllBooks().then((books) => setAllBooks(books.docs));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    const res = firebase.signOutUser();
    console.log('User LogOut SuccessFully', res);
    toast.success('User LogOut Successfully');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the index range for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = allBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate the total number of pages
  const totalPages = Math.ceil(allBooks.length / booksPerPage);

  // Generate the pagination links/buttons
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <button key={i} onClick={() => paginate(i)}>
        {i}
      </button>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-outline-dark mt-2 m-2" type="submit">
          <Link to="/login">Login</Link>
        </button>
        {/* <button className="btn btn-outline-dark mt-2 m-2" type="submit">
          <Link to="/register">Register</Link>
        </button>  */}
       <button className="btn btn-outline-dark mt-2 m-2" type="submit" onClick={handleLogout}>
          <Link to="/register">LogOut</Link>
        </button>
      </div>
      <div className="container mt-5 text-center">
        <CardGroup>
          {currentBooks.map((book) => (
            <Card Link={`/book/view/${props.id}`} key={book.id} id={book.id} {...book.data()} />
          ))}
        </CardGroup>
      </div>
      <div className="pagination">{paginationLinks}</div>
    </>
  );
}

export default Home;
