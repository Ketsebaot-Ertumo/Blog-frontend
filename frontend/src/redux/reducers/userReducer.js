import { useState } from "react";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_RESET, USER_SIGNUP_SUCCESS } from "../constants/userConstants";

export const userReducerSignUp =(State (), action) =>{
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return{ loading: true}
        case USER_SIGNUP_SUCCESS:
            return{ loading: false,
                    userSignUp: action.payload} 
        case USER_SIGNUP_FAIL:
            return{ loading: false,
                    error: action.payload}
        case USER_SIGNUP_RESET:
            return{ }
        default:
           return State;
    }
}