import { toast } from "react-toastify";
import { USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, 
    USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants"
import axios from 'axios';


//sign up action
export const userSignUpAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNUP_REQUEST});
    try{
        const {data} = await  axios.post('/api/signup', user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully");
    }catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//sign in action
export const userSignInAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const {data} = await  axios.post('/api/signin', user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Log In Successfully");
    }catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//user logout action
export const userLogoutAction = (user) => async(dispatch) =>{
    dispatch({type: USER_LOGOUT_REQUEST});
    try{
        const {data} = await  axios.get('/api/logout');
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log Out Successfully");
    }catch(error){
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//user profile action of me
export const userProfileAction =() => async(dispatch) =>{
    dispatch({type: USER_PROFILE_REQUEST});
    try{
        const {data} = await  axios.get("/api/me");
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response.data.error
        });
    }
}


// //user profile action
// export const userProfileAction = (userId) => {
//     return async (dispatch) => {
//       dispatch({ type: 'USER_PROFILE_REQUEST' })
  
//       try {
//         const response = await fetch(`/api/me/${userId}/profile`)
//         const userProfile = await response.json()
  
//         dispatch({
//           type: 'USER_PROFILE_SUCCESS',
//           payload: userProfile
//         })
//       } catch (error) {
//         dispatch({ type: 'USER_PROFILE_FAIL', error })
//       }
//     }
//   }


//user profile update action
//export const updateUserReducerProfile = (userId, updatedProfile) => {
    // return async (dispatch) => {
    //     dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS' })
    
    //     try {
    //       const response = await fetch(`/api/me/${userId}/profile`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(updatedProfile)
    //       })
    //       const userProfile = await response.json()
    
    //       dispatch({
    //         type: 'UPDATE_USER_PROFILE_SUCCESS',
    //         payload: userProfile
    //       })
    //     } catch (error) {
    //       dispatch({ type: 'UPDATE_USER_PROFILE_FAILURE', error })
    //     }
    //   }
    // }


//user profile delete action
//export const deleteUserProfile = (userId) => {
    // return async (dispatch) => {
    //     dispatch({ type: 'DELETE_USER_PROFILE_REQUEST' })
    
    //     try {
    //       await fetch(`/api/me/${userId}/profile`, { method: 'DELETE' })
    
    //       dispatch({ type: 'DELETE_USER_PROFILE_SUCCESS' })
    //     } catch (error) {
    //       dispatch({ type: 'DELETE_USER_PROFILE_FAILURE', error })
    //     }
    //   }
    // }


