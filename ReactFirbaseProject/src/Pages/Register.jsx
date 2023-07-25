import React, { useState, useEffect } from 'react'
import { useFirebase } from "../context/Firebase"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Register() {

  const firebase = useFirebase();
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // useEffect(()=>{
  //     if(firebase.isLoginIn){
  //      //navigate to home
  //      navigate('/');
  //     }
  //     },[firebase,navigate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('sighn Up a user.....');
    const result = await firebase.signupUserWithEmailAndPassword(email, password);
    console.log('Successfully', result);
    toast.success('User Created Successfully');

  }
  //   console.log(firebase);
  return (
    <div className='container mt-5'>
      <h1>Register</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => { setEmail(e.target.value) }}
            value={email}

          />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}

          />
        </div>

        <button onClick={handleSubmit} type="submit" className="btn btn-dark">
         <Link to='/'>Register </Link></button>
      </form>

    </div>
  )
}

export default Register