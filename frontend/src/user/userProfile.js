// UserProfile.js
import React, { useState, useEffect } from 'react';
//import Post from '../../../backend/models/postModel';
import { Link } from 'react-router-dom';
import { Box, Button, Paper, Typography } from "@mui/material";
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from "axios";
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify';





const UserProfile=() =>{
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null);
  const [posts, setPosts] = useState([]);

  
  //show posts by id for user
  const displayPost= async(postId) => {
        console.log(postId);
       
        try{
          //await axios.get(`/api/posts/show/${id}`);                 //err
          const {response}= await axios.get(`/api/posts/show/${postId}`);
          //axios.get(`/api/posts/show?postedBy=${res.data._id}`)
          console.log(response.data)
          setPosts(response.data);
            }
         catch(error){
            console.log(error);
            toast.error(error);
        }
      }
     useEffect(() =>{
      axios.get('/api/me').then((res) => {
         setUser(res.data);
         displayPost(res.data._id);
         setName(res.data.name);
         
       }, []);
      })


//   //show posts
// useEffect(() => {
//   axios.get('/api/me').then((res) => {
//       setUser(res.data);
//       axios.get(`/api/posts/show?postedBy=${res.data._id}`).then((res) => {
//          setPosts(res.data);
//       });
//       setName(res.data.name);
//       }, []);
//   })



  //delete posts
  const deletePostById= async(e, id) => {
    //console.log(id)
    if(window.confirm('Are you sure you want to delete this post')){
        try{
            const {data} = await axios.delete(`/api/delete/post/${id}`);
            if(data.success === true){
                toast.success(data.message);
                displayPost();
            }
        }catch(error){
            console.log(error);
            toast.error(error);
        }
    }
}



    const handleNameChange = (event) => {
    setName(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
    setPreviewProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('profilePicture', profilePicture);
        axios.patch('/api/me', formData).then((res) => {
          setUser(res.data);
    });
  };

  
      const columns =[
        {
            field: '_id',
            headerName: 'Post ID',
            width: 150,
            editable: true
        },
        {
            field: 'title',
            headerName: 'Post title',
            width: 150
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img width="40%" src={params.row.image.url} alt='' />
            )
        },
        {
            field: 'likes',
            headerName: 'Likes',
            width: 150,
            renderCell: (params) => (params.row.likes.length)
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 150,
            renderCell: (params) => (
                params.row.comments.length
            )
        },
        {
            field: 'postedBy',
            headerName: 'Posted By',
            width: 150,
            valuebetter: (data) => data.row.postedBy.name
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: 'Actions',
            width: 100,
            renderCell: (value) => (
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '170px'}}>
                    <Link to={`/user/post/edit/${value.row._id}`}>
                        <IconButton aria-label="edit">
                            <EditIcon  sx={{color: 'e1976d2'}} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deletePostById(e, value.row._id)}>
                        <DeleteIcon sx={{color: "red"}} />
                    </IconButton>
        </Box>
            
        )

    }
       
    ];

  
  return (
    <div>
      {/* <profile /> */}
      <h1>{user.name}</h1>
      <img src={previewProfilePicture || user.profilePicture} alt="Profile" />           
      
      {/* {
      posts.map((post) => (
        <Post key={post._id} post={post} />
      ))
      } */}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Profile Picture:
          <input type="file" onChange={handleProfilePictureChange} />
        </label>
        <button type="submit">Save</button>
      </form>

      
            <Box>

                <Typography variant="h4" sx={{color: 'black', pb: 3}}>
                    Posts
                </Typography>
                <Box sx={{pb:2, display: 'flex', justifyContent: 'right'}}>
                    <Button variant="contained" color='success' startIcon={<AddIcon />}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to='/user/post/create'>
                            Create Post
                        </Link>
                    </Button>
                </Box>
                <Paper sx={{bgcolor:'white'}}>
                    <Box sx={{height: 400, width: '100%'}}>
                        <DataGrid getRowId={(row) => row._id} 
                            sx={{
                                '& .MuiTablePagination-displayedRow':{
                                color: 'black',
                            },
                            color: 'black',
                            [
                                `& .${gridClasses.row}`]:{bgcolor: 'white'},
                            }}

                            rows={posts}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                        />

                    </Box>

                </Paper>
            </Box>
        


    </div>
  );
}

export default UserProfile;

