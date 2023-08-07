import React, { useEffect } from "react";
import UserProfile from "../user/userProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
    const {userInfo} = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate= useNavigate();
}

export default UsersList
