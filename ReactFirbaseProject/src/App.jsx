import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import List from './Pages/List';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import ViewOrder from './Pages/ViewOrder';
import ViewOrderDetails from './Pages/ViewOrderDetails';
import { Toaster } from 'react-hot-toast'
// coponents

import Navbar from './Components/Navbar';
import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='book/list' element={<List />}></Route>
        <Route path='/book/view/:bookid' element={<Detail />}></Route>
        <Route path='/book/orders' element={<ViewOrder />}></Route>
        <Route path='/book/orders/details' element={<ViewOrderDetails />}></Route>

      </Routes>
    </>
  )
}

export default App
