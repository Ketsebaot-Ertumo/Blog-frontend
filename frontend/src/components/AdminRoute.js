import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminRoute= ({children}) => {

    const {userInfo}= useSelector((state) => state.signIn);
    const iterableChildren = Array.isArray(children) ? children : [children];
    return userInfo && userInfo.role === 'admin' ? iterableChildren : <Navigate to="/" />;
  };


export default AdminRoute;

  


