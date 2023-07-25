import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
function Card(props) {

  const firebase = useFirebase();

  const [url, setURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));

  }, [])
  return (
    <div>
      <div className="card h-100" style={{ width: "18rem", margin: "25px" }}>
        <img src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">This book has a title{props.name} and this book is sold by {props.displayName}
            and this book costs is {props.price}
          </p>
          <a className="btn btn-primary" onClick={e => navigate(`/book/view/${props.id}`)}>View</a>
        </div>
      </div>
    </div>
  )
}

export default Card