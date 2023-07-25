import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import toast from 'react-hot-toast';

function Navbar() {

  const {user} = useFirebase();

  let data = '';
  if(user === null){
     data = '';
  } else {
    data = user.email;
  }


  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">FireBaseApp</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="book/list">Add Listing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="book/orders">Orders </Link>
        </li>
         </ul>
          <ul className="d-flex" role="search">
          {data}
          </ul> 
     </div>
  </div>
</nav>
   </>
  )
}

export default Navbar