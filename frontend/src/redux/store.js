import { combineReducers, applyMiddleware, createStore} from "redux"; 
import thunk from 'redux-thunk';
import { composeWithDevTools} from "@redux-devtools/extension";
import { userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from "./reducers/userReducer";


//combine reducers
const reducers= combineReducers({
    signUp: userReducerSignUp,
    signIn: userReducerSignIn,
    userProfile: userReducerProfile,
    logOut: userReducerLogout
});

//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null
    }
}

const middleware = [thunk];
const store= createStore(reducers, initialState, composeWithDevTools(applyMiddleware))

export default store;