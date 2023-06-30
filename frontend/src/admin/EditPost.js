import React from "react";
import {Box, Button, TextField, Typography} from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import Dropzone from "react-dropzone";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import {toast} from 'react-toastify';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { modules } from "../components/moduleToolbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema =yup.object({
    title: yup
        .string('Add a Post Title')
        .min(4, 'text content should have min of 4 char.s')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have minimum of 10 char.s')
        .required('text content is required'),
});


const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [image, setImage]= useState('');
    const [imagePreview, setImagePreview]= useState('');
    const navigate= useNavigate();

    const {
        values, 
        errors, 
        touched, 
        handleBlur, 
        handleChange, 
        handleSubmit, 
        setFieldValue} = useFormik({
            initialValues: {
                title,
                content,
                image: '',
            },

            validationSchema : validationSchema,
            enableReinitialize: true,
            onSubmit: (values, actions) => {
                    updatePost(values);
                    //alert(JSON.stringify(values, null, 2));
                    actions.resetForm();

            }
        });

        //show single post by id
        const singlePostById= async () => {
            //console.log(id);
            try{
                const {data}= await axios.get(`/api/post/${id}`);
                setTitle(data.post.title);
                setContent(data.post.content);
                setImagePreview(data.post.image.url);
                console.log('single post', data.post)
            }catch(error){
                console.log(error);
                toast.error(error);
            }
        }

    useEffect(() => {
        singlePostById()
    }, []);


    const updatePost= async (values) => {
        try{
            const {data}= await axios.post(`/api/update/post/${id}`, values);
            if (data.success=== true){
                toast.success('post updated');
                navigate('/user/dashboard')
                navigate('/admin/dashboard')
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.error);
        }
    }


    return (
        <>
            <Box sx={{bgcolor:"white", padding: "20px 200px"}}>
                <Typography variant="h5" sx={{pb:4}}>Create Post</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{st:1}}>
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
                    <Box component='span' sx={{color:'#d32f2f', fontSize:"12px", pl:"2"}}>touched.content</Box>
                </Box>
                <Box border={"2px dashed blue"} sx={{p:1}}>
                    <Dropzone
                        acceptedFiles=".jpg, .jpng, .png, jpeg, .mp4"
                        multiple={false}
                        //maxFiles={3}
                        onDrop={(acceptedFiles) =>
                            acceptedFiles.map((file, index) =>{
                                const reader= new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend= () =>{
                                    setFieldValue('images', reader.result)
                            }
                          })
                        }  
                    >
                        
                        {({getRootProps, getInputProps, isDragActive}) =>(
                            <Box
                                {...getRootProps()}

                                p="1rem"
                                sx= {{'&:hover': {curser: "pointer"}, bgcolor: isDragActive ? "#cceffc" : "#fafafa "}}
                            >
                                <input {...getInputProps()} />
                                {
                                    isDragActive ? 
                                    <>
                                    <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                    <p style={{textAlign:"center", fontSize:"12px"}} > Drag here</p>
                                    
                                    </> :

                                values.image === null ?

                                    <>
                                        <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                        <p style={{textAlign:"center", fontSize:"12px"}} > Drag and Drop here or click to choose</p>
                                    </> :

                                    <>
                                        <Box sx={{display: "flex", justifyContent: 'space-around', alignItems: 'center'}}>
                                        <Box><img style={{maxWidth: '100px'}} src={values.image === '' ? imagePreview: values.image} alt='' /></Box>
                                        </Box>  
                                    </>
                                }
                                
                                
                            </Box> 
                         )}
                    </Dropzone>
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    elevation={0}
                    sx={{mt:3, p:1,nmb:2, boarderRadius: "25px",}}
                //disabled={loading}
                >
                    Create Post
                </Button>
                </Box>
            
            </Box>
      </>
    )
       
}

export default EditPost