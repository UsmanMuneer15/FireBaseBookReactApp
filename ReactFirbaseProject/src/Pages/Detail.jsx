import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Detail() {

  const params = useParams();
  const firebase = useFirebase();
  console.log(params);

  const [data, setData] = useState(null);

  const [url, setURL] = useState(null);

  const [qty, setQty] = useState();



  useEffect(() => {
    firebase.getBookId(params.bookid).then((value) => setData(value.data()))
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);
  console.log(data);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookid, qty);
  }

  if (data == null) return <h1>Loading....</h1>;
  return (
    <div className='container'>

      <h1>{data.name}</h1>
      <img src={url} width='50%' style={{ borderRadius: '10px' }} />
      <h1>Details</h1>
      <p>Name:{data.displayName}</p>
      <p>Gmail:{data.userEmail}</p>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN:{data.isbnNumber}</p>
      <p>User Id:{data.userID}</p>
      <label className="form-label">Quantity:</label>
      <input type='number' className='form-control' placeholder='Enter Qty' onChange={(e) => setQty(e.target.value)} value={qty}></input>
      <Button className='mt-3 btn btn-dark' onClick={placeOrder}><Link to='/'>Buy Now</Link></Button>

    </div>
  )
}

export default Detail