
//import { create } from "../../../../backend/models/userModels";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_RESET, 
    USER_SIGNUP_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, USER_SIGNIN_RESET, SHOW_PROFILE_FAIL, SHOW_PROFILE_REQUEST, 
    SHOW_PROFILE_RESET, SHOW_PROFILE_SUCCESS, CREATE_PROFILE_PICTURE_FAIL, 
    CREATE_PROFILE_PICTURE_REQUEST, CREATE_PROFILE_PICTURE_RESET, 
    CREATE_PROFILE_PICTURE_SUCCESS, UPDATE_PROFILE_FAIL, 
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, 
    DELETE_PROFILE_PICTURE_FAIL, DELETE_PROFILE_PICTURE_REQUEST, DELETE_PROFILE_PICTURE_RESET, 
    DELETE_PROFILE_PICTURE_SUCCESS, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_RESET, USER_LOGOUT_REQUEST } from "../constants/userConstants";


//sign up
export const userReducerSignUp =(state={}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return{
                loading: true,
                isAuthenticated: false}
        case USER_SIGNUP_SUCCESS:
            return{
                loading: false,
                userSignUp: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNUP_FAIL:
            return{ 
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }
        case USER_SIGNUP_RESET:
            return{}

        default:
           return state;
    }
}

// //email confirmation
// export const userReducerEmailConfirmation =(state={}, action) => {
//     switch (action.type) {
//         case CONFIRM_REQUEST:
//             return{
//                 loading: true}
//         case CONFIRM_SUCCESS:
//             return{
//                 loading: false,
//                 user: {isConfirmed: true},
//                 error: null
//             }
//         case CONFIRM_FAIL:
//             return{ 
//                 loading: false,
//                 error: action.payload,
//                 user: null
//             }
//         case USER_SIGNUP_RESET:
//             return{}

//         default:
//            return state;
//     }
// }


//sign in
export const userReducerSignIn =(state={}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return{
                loading: true, 
                userInfo: null, 
                isAuthenticated: false}
        case USER_SIGNIN_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return{ 
                loading: false,
                userInfo: null,
                isAuthenticated: false,
                error: action.payload
            }
        case USER_SIGNIN_RESET:
            return{}
            
        default:
           return state;
    }
}


//log out
export const userReducerLogout =(state={}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return{ loading: true }
        case USER_LOGOUT_SUCCESS:
            return{
                loading: false,
                user: action.payload,}
        case USER_LOGOUT_FAIL:
            return{ 
                loading: false,
                error: action.payload}
        case USER_LOGOUT_RESET:
            return{}
        default:
           return state;
    }
}


//create profile PICTURE
export const userReducerCreateProfilePicture =(state={}, action) => {
    switch (action.type) {
        case CREATE_PROFILE_PICTURE_REQUEST:
            return{ loading: true }
        case CREATE_PROFILE_PICTURE_SUCCESS:
            return{
                loading: false,
                user: action.payload,}
        case CREATE_PROFILE_PICTURE_FAIL:
            return{ 
                loading: false,
                error: action.payload}
        case CREATE_PROFILE_PICTURE_RESET:
            return{}
        default:
           return state;
    }
}

//update profile 
export const userReducerUpdateProfile =(state={}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return{ loading: true }
        case UPDATE_PROFILE_SUCCESS:
            return{
                loading: false,
                user: action.payload,}
        case UPDATE_PROFILE_FAIL:
            return{ 
                loading: false,
                error: action.payload}
        case UPDATE_PROFILE_RESET:
            return{}
        default:
           return state;
    }
}


//Delete profile picture
export const userReducerDeleteProfilePicture =(state={}, action) => {
    switch (action.type) {
        case DELETE_PROFILE_PICTURE_REQUEST:
            return{ loading: true }
        case DELETE_PROFILE_PICTURE_SUCCESS:
            return{
                loading: false,
                user: action.payload,}
        case DELETE_PROFILE_PICTURE_FAIL:
            return{ 
                loading: false,
                error: action.payload}
        case DELETE_PROFILE_PICTURE_RESET:
            return{}
        default:
           return state;
    }
}


// //show profile
// export const userReducerShowProfile =(state={}, action) => {
//     switch (action.type) {
//         case SHOW_PROFILE_REQUEST:
//             return{ loading: true ,
//                 isAuthenticated: false}
//         case SHOW_PROFILE_SUCCESS:
//             return{
//                 loading: false,
//                 user: action.payload,
//                 isAuthenticated: true}
//         case SHOW_PROFILE_FAIL:
//             return{ 
//                 loading: false,
//                 error: action.payload}
//         case SHOW_PROFILE_RESET:
//             return{}
//         default:
//            return state;
//     }
// }
