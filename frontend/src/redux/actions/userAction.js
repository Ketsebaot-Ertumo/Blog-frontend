import { toast } from "react-toastify";
import axios from 'axios';
import { SHOW_PROFILE_REQUEST, SHOW_PROFILE_FAIL, SHOW_PROFILE_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, 
    USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, CREATE_PROFILE_PICTURE_REQUEST, CREATE_PROFILE_PICTURE_SUCCESS, CREATE_PROFILE_PICTURE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, 
    UPDATE_PROFILE_FAIL, DELETE_PROFILE_PICTURE_REQUEST, DELETE_PROFILE_PICTURE_SUCCESS, DELETE_PROFILE_PICTURE_FAIL } from "../constants/userConstants"



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

// //Confirm email
// export const confirmEmail = (confirmationCode) => async (dispatch) => {
//     dispatch({type: CONFIRM_REQUEST});
//     try{
//         const response= await axios.get(`/api/confirm/${confirmationCode}`);
//         dispatch({
//             type: CONFIRM_SUCCESS, 
//             payload: response.data
//     });
//     }catch(error){
//         dispatch({
//             type: CONFIRM_FAIL,
//             payload: error.response.data
//         });
//     }
// };


//sign in action
export const userSignInAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const {data} = await  axios.post('/api/signin', user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        // //store authentication token in local storage
        //localStorage.setItem('authToken', data.token)

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
        //localStorage.removeItem('authToken');
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



// //show profile action
// export const showProfileAction =(userId) => async(dispatch) =>{
//     //const user = await User.findOne({email: req.body.email}).select('password');
//     dispatch({type: SHOW_PROFILE_REQUEST});
//     try{
//         const {data} = await  axios.get('/api/me');
//         dispatch({
//             type: SHOW_PROFILE_SUCCESS,
//             payload: data,
//             // payload: userProfile
//         });
//     }catch(error){
//         dispatch({
//             type: SHOW_PROFILE_FAIL,
//             payload: error.response.data.error
//         });
//     }
// }



//create profile picture action
export const createProfilePictureAction =(user) => async(dispatch) =>{
    //const user = await User.findOne({email: req.body.email}).select('password');
    dispatch({type: CREATE_PROFILE_PICTURE_REQUEST});
    try{
        const {data} = await  axios.post('/api/me');
        dispatch({
            type: CREATE_PROFILE_PICTURE_SUCCESS,
            payload: data,
            // payload: userProfile
        });
    }catch(error){
        dispatch({
            type: CREATE_PROFILE_PICTURE_FAIL,
            payload: error.response.data.error
        });
    }
}


   //Update profile action
export const updateProfileAction = (user) => async(dispatch) =>{
    //const user = await User.findOne({email: req.body.email}).select('password');
    dispatch({type: UPDATE_PROFILE_REQUEST});
    try{
        const {data} = await axios.put('/api/me');
         dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data,
            // payload: userProfile
        });
    }catch(error){
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.error
        });
    }
}

// delete profile picture 
export const deleteProfilePictureAction = (user) => async(dispatch) =>{
    //const user = await User.findOne({email: req.body.email}).select('password');
    dispatch({type: DELETE_PROFILE_PICTURE_REQUEST});
    try{
        const {data} = await axios.delete('/api/me');
         dispatch({
            type: DELETE_PROFILE_PICTURE_SUCCESS,
            payload: data,
            // payload: userProfile
        });
    }catch(error){
        dispatch({
            type: DELETE_PROFILE_PICTURE_FAIL,
            payload: error.response.data.error
        });
    }
}






