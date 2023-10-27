import { combineReducers, applyMiddleware, createStore} from "redux"; 
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { userReducerLogout, userReducerProfile, userReducerEmailConfirmation, userReducerSignIn, userReducerSignUp } from "./reducers/userReducer";


//combine reducers
const reducer= combineReducers({
    signUp: userReducerSignUp,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    //showProfile: userReducerProfile,
    //createProfilePicture: userReducerProfilePicture,
    //updateProfile: userUpdateProfile,
    //deleteProfilePicture: userDeleteProfilePicture,
    //emailConfirmation: userReducerEmailConfirmation
});

// const token =localStorage.getItem('token');
// const token =Cookies.getItem('token');
// console.log("token",token)

//initial state
const initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }

    // signIn: {
    //     userInfo: token ? {token} : null
    // }
}

const middleware = [thunk];
const store= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;