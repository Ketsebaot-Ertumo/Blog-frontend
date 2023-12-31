import React, {useEffect} from "react";
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignUpAction } from "../redux/actions/userAction";
import Navbar from "../components/Navbar";
import { Avatar, Box,} from "@mui/material";
import Footer from "../components/Footer";



const validationSchema= yup.object({
    name: yup
        .string('Enter your name')
        .max(20,"Name can't exceed 20 characters")
        .min(4,"Name can't be lessthan 4 characters")
        .required("Name is required"),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 chars length')
        .required('Password is required'),
});

const Register= () =>{

    const dispatch= useDispatch();
    const navigate= useNavigate();
    
    const {loading, isAuthenticated, userSignUp}= useSelector(state=> state.signUp);
    
    useEffect(() =>{
        if (isAuthenticated) {
            if (userSignUp.role === 'admin') {
                navigate('/admin/dashboard');
            }else{
                navigate('/user/profile');
             } }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    const formik= useFormik({
        initialValues: {
            email: '',
            password: '',
            name:''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //alert(JSON.stringify(values, null,2));
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    })

    return(
        <>
        <Navbar />
        <Box sx={{height: '81vh', display: "flex", alignItems:"center", justifyContent: "center", bgcolor: "primary.white"}}>

            <Box onSubmit={formik.handleSubmit} component="form" className="form_style boarder-style" >
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}} >
                    <Avatar sx={{m:1, bgcolor:"primary.main", mb:3}} >
                        <LockClockOutlined />
                    </Avatar>
                    <TextField
                         sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            },
                            fieldset: {boarderColor: "rgb(231, 215, 240)"}
                          }}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name='email'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="E-mail Adress"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                     />
                     <TextField
                     sx={{
                        mb: 3,
                        "& .MuiInputBase-root":{
                            color: 'text.secondary'
                        },
                        fieldset:{ boarderColor: "rgb(231, 235, 240)"}
                     }}
                     fullWidth
                     id="password"
                     name="password"
                     label="Password"
                     type="password"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     placeholder="Password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.password && Boolean(formik.errors.password)}
                     helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                     sx={{
                        mb: 3,
                        "& .MuiInputBase-root":{
                            color: 'text.secondary'
                        },
                        fieldset:{ boarderColor: "rgb(231, 235, 240)"}
                     }}
                     fullWidth
                     id="name"
                     name="name"
                     label='Name'
                     type="name"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     placeholder="Name"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                />
             
             <Button disabled={loading} fullWidth variant="contained" type="submit">{loading ? "Loading...":"Sign Up" }</Button>
             <p>Already have an Account, <a href="/LogIn">Login.</a></p>
           </Box>
        </Box>
      </Box>
      <Footer />
  </>
)
}

export default Register;