import { combineReducers, applyMiddleware, createStore} from "redux"; 
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from "./reducers/userReducer";


//combine reducers
const reducer= combineReducers({
    signUp: userReducerSignUp,
    signIn: userReducerSignIn,
    userProfile: userReducerProfile,
    logOut: userReducerLogout
});

//initial state
const initialState = {
    
}

const middleware = [thunk];
const store= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;