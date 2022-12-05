import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../views/Register/index"
import Login from '../views/Login/index'
import Forgot from '../views/Forgot/index'
import Landing from '../views/Landing/index'
import Chat from '../views/Chat/index'
import Profile from '../views/Profile/index'
import EditProfile from '../views/EditProfile/index'



const Router=()=>{
    return(
        <BrowserRouter>
        <Routes>
         <Route path="/">
         <Route index element={<Login />} />
         <Route path="register" element={<Register />} />
         <Route path="forgot" element={<Forgot />} />
         <Route path="landing" element={<Landing />} />
         <Route path="chat" element={<Chat />} />
         <Route path="profile" element={<Profile />} />
         <Route path="editprofile/:id_user" element={<EditProfile />} />

         </Route>
         </Routes>
        </BrowserRouter>
    )
}
export default Router;