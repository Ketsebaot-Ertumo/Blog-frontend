import React, { useState } from "react";
import { Box, Button, TextField, Typography} from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import {modules}  from '../components/moduleToolbar';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import dataUriToFile from 'data-uri-to-file';


const validationSchema =yup.object({
    title: yup
        .string('Add a Post Title')
        .min(4, 'text content should have min of 4 chars')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have minimum of 10 chars')
        .required('text content is required'),
    // file: yup
    //     .object('Add image')
    //     .required('image is required'),
});

const CreatePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();


        const createNewPost = async(values) => {
            console.log(values);
            try{
                // const {data} = await axios.post('/api/post/create', values);          
                // setPosts([...posts, data.post]); 

                // try {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('content', values.content);
                    formData.append('image', values.image);
                    // formData.append('file', dataUriToFile(values.file, 'file')); // Convert Base64 to File
                
                    const response = await axios.post('/api/post/create', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    });
                
                    const newPost = response.data.post;
                    setPosts([...posts, newPost]);


                // const response = await axios.post('/api/post/create', values);                  //err
                // console.log(response)                 
                // const newPost = response.data.post;
                // console.log(data)
                // setPosts([...posts, newPost]);
                //if (data.success=== true){}
                toast.success('post created successfully!');
                const userInfoObject = JSON.parse(localStorage.getItem('userInfo'));
                // console.log(userInfoObject);
                if(userInfoObject.role === 'user'){
                navigate('/user/userProfile')}
                else{
                navigate('/admin/dashboard')}
            }catch(error){
                console.log(error, values);
                //toast.error(error.message);
                toast.error('Failed to create post. Please try again.' || error.message);
            }
        };

    const {
        values, 
        errors, 
        touched, 
        handleBlur, 
        handleChange, 
        handleSubmit, 
        setFieldValue} = useFormik({
            initialValues: {
                title: '',
                content: '',
                image: null,
            },

            validationSchema : validationSchema,
            onSubmit: (values, actions) => {
                    // createNewPost(values, actions);
                    createNewPost(values);
                    //alert(JSON.stringify(values, null, 2));
                    actions.resetForm();

            }
        });

    


    return(
        <>
          <Box sx={{bgcolor:"white", padding: "20px 200px"}}>
              <Typography variant="h5" sx={{pb:4}}>Create Post</Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:1}} encType="multipart/form-data">
                <TextField sx={{mb:3}}
                    fullWidth
                    id="title"
                    label="Post title"
                    name="title"
                    InputLabelProps={{
                        shrink:true,
                    }}
                    placeholder="Post title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />
                    <Box sx={{mb:3}}>
                        <ReactQuill
                            theme="snow"
                            placeholder={'Write the post content...'}
                            modules={modules}
                            value={values.content}
                            onChange={(e) => setFieldValue('content',e)}
                        />

                    
                        <Box component='span' sx={{color:'#d32f2f', fontSize:"12px", pl: 2 }}>{touched.content && errors.content}</Box>
                 </Box>

                 <Box border={"2px dashed blue"} sx={{p:1}}>
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png, .jpng, .mp4"
                        multiple={false}
                        //maxFiles={3}
                        onDrop={(acceptedFiles) => {
                            const image = acceptedFiles[0];
                            setFieldValue("image", image);
                        }}
                        // onDrop={(acceptedFiles) =>
                        //     acceptedFiles.map((image, index) =>{
                        //         const reader= new FileReader();
                        //         reader.readAsDataURL(image);
                        //         reader.onloadend= () =>{
                        //             setFieldValue('image', reader.result)
                        //              };
                        //     })}  
                    >
                        {({getRootProps, getInputProps, isDragActive}) =>(
                            <Box
                                {...getRootProps()}

                                p="1rem"
                                sx= {{"&:hover": {cursor: "pointer"}, bgcolor: isDragActive ? '#cceffc' : '#fafafa'}}
                            >
                                <input {...getInputProps()} />
                                {
                                   isDragActive ? (
                                   <>
                                    <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                    <p style={{textAlign:"center", fontSize:"12px"}} > Drag here!</p>
                                  
                                   </>) :

                                   values.file === null ?(

                                   <>
                                        <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                        <p style={{textAlign:"center", fontSize:"12px"}} > Drag and Drop image here or click to choose!</p>
                                   </>) :(

                                   <>
                                      <Box sx={{display: "flex", justifyContent: 'space-around', alignItems: 'center'}}>
                                        <Box><img style={{maxWidth: '100px'}} src={values.file} alt="" /></Box>
                                      </Box>  
                                   </>
                               ) }
                                
                            </Box> 
                        )}
                    </Dropzone>
                 </Box>

                 <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    elevation={0}
                    sx={{mt:3, p:1,mb:2, boarderRadius: "25px",}}
                 //disabled={loading}
                 >
                    Create Post
                 </Button>
              </Box>
          
          </Box>
        </>
    );
       
    
}
export default CreatePost