// import React, { useEffect } from "react";
// import UserProfile from "../user/userProfile";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const UsersList = () => {
//     const {userInfo} = useSelector(state => state.signIn);
//     const dispatch = useDispatch();
//     const navigate= useNavigate();
// }


import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import PeoplesIcon from '@mui/icons-material/PeopleSharp'
import EditIcon from '@mui/icons-material/Edit';
import {toast} from 'react-toastify';
import { useState } from "react";



const UsersList = () => {
    
    // const [users, setUsers] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(false);
    

    
    //show all users
    const displayUsers= async () => {
        setLoading(true);
        try{
            const {data} = await axios.get('/api/users');
            setUsers(data.users);
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch posts.');
            setLoading(false);
        }
    }
    useEffect(() =>{
        displayUsers();
    }, []);


    // //show all posts
    // useEffect(()=>{
    //     axios.get('/api/posts/show).then((res) => {
    //         setPosts(res.data);
    //     });
    // }, []);



    //delete post by id
    const deleteUserById= async(e, _id) => {
        // console.log(_id);
        if(window.confirm('Are you sure you want to delete this user')){
            try{
                const {data} = await axios.delete(`/api/delete`);
                if(data.success === true){
                    toast.success(data.message);
                    displayUsers();
                }
            }catch(error){
                console.log(error);
                toast.error('Failed to delete post');
            }
        }
    };


    //show a user
    const showUser= async(e, _id) => {
        // console.log(_id);
        setLoading(true);
        try{
            const {data} = await axios.get(`/api/me`);
            if(data.success === true){
                toast.success(data.user);
                setUsers(data.users);
                setLoading(false);
            }
        }catch(error){
            console.log(error);
            toast.error('Failed to delete post');
            setLoading(false);
        }
    // }
    };



    const columns =[
        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true
        },
        {
            field: 'name',
            headerName: 'User Name',
            width: 150
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
        },
        {
            field: 'profilePicture',
            headerName: 'Profile Picture',
            width: 150,
            renderCell: (params) => ( params.row.image && params.row.image.url ?
                <img width="40%" src={params.row.image.url} alt="" /> : null)
        },
        {
            field: 'date',
            headerName: 'Create Date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.date).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
        field: 'Actions',
        width: 100,
        renderCell: (value) => (
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '170px'}}>
                <Link to={`/admin/user/edit/${value.row._id}`}>
                    <IconButton aria-label="edit">
                        <EditIcon  sx={{color: '#1976d2'}} />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" onClick={(e) => deleteUserById(e, value.row._id)}>
                    <DeleteIcon sx={{color: "red"}} />
                </IconButton>
                <IconButton aria-label="show" onClick={(e) => showUser(e, value.row._id)}>
                    <PeoplesIcon sx={{color: "blue"}} />
                </IconButton>
            </Box>
            
        )

    }
       
    ];


   
    return(
        <>
            <Box>

                <Typography variant="h4" sx={{color: 'black', pb: 3}}>
                    Users
                </Typography>
                {/* <Box sx={{pb:2, display: 'flex', justifyContent: 'right'}}>
                    <Button variant="contained" color='success' startIcon={<AddIcon />}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to='/admin/user/create'>
                            Create Post
                        </Link>
                    </Button>
                </Box> */}
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

                            rows={users}
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

export default UsersList
