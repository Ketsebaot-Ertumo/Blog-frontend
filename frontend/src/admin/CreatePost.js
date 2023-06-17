import React from "react";
import { Box, Button, TextField,Typography} from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from "../components/moduleToolbar";


const CreatePost = () => {

    const formik = useFormik();

    return(
        <>
          <Box sx={{bgcolor:"white", padding: "20px 200px"}}>
              <Typography variant="h5" sx={{pb:4}}>Create Post</Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{st:1}}>
                <TextField sx={{mb:3}}
                    fullwidth
                    id="title"
                    label="Post title"
                    name="title"
                    InputLabelProps={{
                        shrink:true,
                    }}
                    placeholder="Post title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                    <Box sx={{mb:3}}>
                        <ReactQuill
                            theme="snow"
                            placeholder={'Write the post content...'}
                            modules={modules}
                            value={formik.values.content}
                            onChange={(e) => formik.setFieldValue('content',e)}
                    />
                    <Box component='span' sx={{color:'ed32f2f', fontSize:"12px", pl:"2"}}>touched.content</Box>
                 </Box>
                 <Box border={"2px dashed blue"} sx={{p:1}}>
                    <Dropzone
                        acceptedFiles=".jpg, .jpng, .png, .mp4"
                        multiple={false}
                        //maxFiles={J}
                        oneDrop={(acceptedFiles) =>
                            acceptedFiles.map((file, index) =>{
                                const reader= new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend= () =>{
                                    formik.setFieldValue=('images', reader.result)
                            }
                     })
                    }  
                    >
                        {({getRootProps, getInputProps, isDragActive}) =>{
                            <Box
                                {...getRootProps()}

                                p="1rem"
                                sx= {{'&:hover': {curser: "pointer"}, bgcolor:isDragActive ? "acceffc" : "afafafa "}}
                            >
                                <input {...getInputProps()} />
                                {
                                   isDragActive ? 
                                   <>
                                    <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                    <p style={{textAlign:"center", fontSize:"12px"}} > Drag here</p>
                                  
                                   </> :

                                formik.values.image === null ?

                                   <>
                                        <p style={{textAlign: "center"}}><CloudUploadIcon sx={{color:"primary.main", mr:2}} /></p>
                                        <p style={{textAlign:"center", fontSize:"12px"}} > Drag and Drop here or click to choose</p>
                                   </> :

                                   <>
                                      <Box sx={{display: "flex", justifyContent: 'space-around', alignItem: 'center'}}>
                                        <Box><img style={{maxWidth: '100px'}} src={useFormik.values.image} alt='' /></Box>
                                      </Box>  
                                   </>
                                }
                                
                                
                            </Box> 
                        } }
                    </Dropzone>
                 </Box>
              </Box>
          
          </Box>
        </>
    )
       
    
}
export default CreatePost