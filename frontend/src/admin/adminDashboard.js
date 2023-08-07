import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify';
import { useState } from "react";



const AdminDashboard = () => {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //show all posts
    // const displayPost= async (res) => {
    //     setLoading(true);
    //     try{
    //         const {data} = await axios.get('/api/posts/show');
    //         setPosts(data.posts);
    //         setLoading(false);
    //     }catch(error){
    //         console.log(error);
    //         toast.error('Failed to fetch posts.');
    //         setLoading(false);
    //     }
    // }

    const displayPost= async (res) => {
        setLoading(true);
        try{
            const {data} = await axios.get('/api/posts/show');
            setPosts(data.posts);
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch posts.');
            setLoading(false);
        }
    }

    useEffect(() =>{
        displayPost();
    }, []);


    // //show all posts
    // useEffect(()=>{
    //     axios.get('/api/posts/show).then((res) => {
    //         setPosts(res.data);
    //     });
    // }, []);



    //delete post by id
    const deletePostById= async(e, _id) => {
        // console.log(id);
        console.log(_id);
        if(window.confirm('Are you sure you want to delete this post')){
            try{
                const {data} = await axios.delete(`/api/delete/post/${_id}`);
                if(data.success === true){
                    toast.success(data.message);
                    displayPost();
                }
            }catch(error){
                console.log(error);
                toast.error('Failed to delete post');
            }
        }
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
            renderCell: (params) => ( params.row.image && params.row.image.url ?
                <img width="40%" src={params.row.image.url} alt="" /> : null
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
            valueGetter: (data) => data.row.postedBy ? data.row.postedBy.name : ''
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
                <Link to={`/admin/post/edit/${value.row._id}`}>
                    <IconButton aria-label="edit">
                        <EditIcon  sx={{color: '#1976d2'}} />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" onClick={(e) => deletePostById(e, value.row._id)}>
                    <DeleteIcon sx={{color: "red"}} />
                </IconButton>
        </Box>
            
        )

    }
       
    ];


   
    return(
        <>
            <Box>

                <Typography variant="h4" sx={{color: 'black', pb: 3}}>
                    Posts
                </Typography>
                <Box sx={{pb:2, display: 'flex', justifyContent: 'right'}}>
                    <Button variant="contained" color='success' startIcon={<AddIcon />}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to='/admin/post/create'>
                            Create Post
                        </Link>
                    </Button>
                </Box>
                <Paper sx={{bgcolor:'white'}}>
                    <Box sx={{height: 400, width: '100%'}}>
                        {loading? ( <div>Loading...</div>) :(
                        <DataGrid getRowId={(row) => row._id || row.id} 
                            sx={{
                                '& .MuiTablePagination-displayedRow': {
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
                        )}
                    </Box>

                </Paper>
            </Box>
        </>
    )
       
    
}
export default AdminDashboard