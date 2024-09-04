import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks"; 
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";    
import Login from "./pages/Login";  
import {Routes, Route } from "react-router-dom";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch , useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";


function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
        <Navbar/>
        <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route path="/all-books" element={<AllBooks/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/profile" element={<Profile/>}>
              <Route index element = {<Favourites/>} />         
              <Route path="/profile/orderHistory" element = {<UserOrderHistory/>} />         
              <Route path="/profile/settings" element = {<Settings/>} />         
           </Route>
           <Route path="/SignUp" element={<SignUp/>}/>
           <Route path="/Login" element={<Login/>}/>
           <Route path="view-book-details/:id" element={<ViewBookDetails/>}></Route>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
