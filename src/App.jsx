// import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import NoPage from './pages/admin/dashboard/NoPage';
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/MyState";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/dashboard/page/AddProduct";
import UpdateProduct from "./pages/admin/dashboard/page/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/registration/SignUp";
const App = () => {
  return (
    <MyState>
          <Router>
          <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/order' element={ 
              <ProtectedRouteForUser>
                <Order/> 
              </ProtectedRouteForUser>
            } />
            <Route path='/cart' element={ <Cart/> } />
            <Route path='/dashboard' element={ 
              <ProtectedRouteForAdmin>
                <Dashboard/>
              </ProtectedRouteForAdmin>
             } />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/productInfo/:id" element={<ProductInfo/>} />
            <Route path="/addproduct" element={
              <ProtectedRouteForAdmin>
                <AddProduct/>
              </ProtectedRouteForAdmin>
            } />
            <Route path="/updateproduct" element={
              <ProtectedRouteForAdmin>
                <UpdateProduct/>
              </ProtectedRouteForAdmin>
            } />
            <Route path='/*' element={ <NoPage/> } />
          </Routes>
          <ToastContainer/>
        </Router>
    </MyState>

  )
}

export default App



// User protection 

export  const ProtectedRouteForUser = ({children}) => {
  const user = localStorage.getItem("user");
  if (user){
    return children;
  }else {
    return <Navigate to={"/login"}/>
  }
}


// User protection 

export  const ProtectedRouteForAdmin = ({children}) => {
    const admin = JSON.parse(localStorage.getItem('user'))

    if (admin.user.email === "amirhamza27940@gmail.com"){
      return children
    }else{
      return <Navigate to={'/login'} />
    }
}
