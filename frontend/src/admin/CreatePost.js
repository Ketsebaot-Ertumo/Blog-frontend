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
import { create } from "@mui/material/styles/createTransitions";


const validationSchema =yup.object({
    title: yup
        .string('Add a Post Title')
        .min(4, 'text content should have min of 4 char.s')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have minimum of 10 char.s')
        .required('text content is required'),
})

const CreatePost = () => {

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
                    //createNewPost(values, actions);
                    alert(JSON.stringify(values, null, 2));
                    actions.resetForm();

            }
        });

    return(
        <>
          <Box sx={{bgcolor:"white", padding: "20px 200px"}}>
              <Typography variant="h5" sx={{pb:4}}>Create Post</Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{st:1}}>
                <TextField sx={{mb:3}}
                    fullwidth
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
                                    setFieldValue=('images', reader.result)
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

                                values.image === null ?

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
export default CreatePost