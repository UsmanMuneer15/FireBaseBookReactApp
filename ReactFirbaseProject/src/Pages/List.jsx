import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { Link } from 'react-router-dom';

function List() {

  const firebase = useFirebase();
  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [coverPic, setCoverPic] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic)
  };


  return (
    <div>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Enter Book Name:</label>
            <input type="text"
              className="form-control"
              placeholder='Enter Book Name'

              onChange={(e) => { setName(e.target.value) }}
              value={name}

            />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">ISBN:</label>
            <input type="text"
              placeholder='Enter ISBN Number'
              className="form-control"

              onChange={(e) => { setIsbnNumber(e.target.value) }}
              value={isbnNumber}

            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Price:</label>
            <input type="number"
              placeholder='Enter Price '
              className="form-control"

              onChange={(e) => { setPrice(e.target.value) }}
              value={price}

            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover File:</label>
            <input type="file"

              className="form-control"

              onChange={(e) => { setCoverPic(e.target.files[0]) }}


            />
          </div>

          <button onClick={handleSubmit} type="submit" className="btn btn-dark">
            <Link to='/'>Create List</Link>
           </button>
        </form>

      </div>
    </div>
  )
}

export default List