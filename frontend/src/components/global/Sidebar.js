import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Person3Icon from '@mui/icons-material/Person3';
import PeoplesIcon from '@mui/icons-material/PeopleSharp'
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import {userLogoutAction, showProfileAction} from '../../redux/actions/userAction';
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';



const SidebarAdm = () => {
    const {userInfo} = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    // useEffect(() => {
    //     dispatch(showProfileAction());
    // },
    //  []);

    //log out
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 2)
    }

    return(
        <>
            <Sidebar backgroundColor="white" style={{boarderRightStyle: "none"}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height:'100%'}}>
                    <Box sx={{pt:4}}>
                        <Menu 
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: "#1976d2",
                                    }
                                },
                            }}>
                                {
                                    userInfo && userInfo.role === 'admin' ?
                                    <>
                                        <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon /> }>Admin Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/admin/post/create" />} icon={<PostAddIcon />}>Create Post</MenuItem>
                                        <MenuItem component={<Link to="/admin/usersList" />} icon={<PeoplesIcon />}>Users List</MenuItem>
                                    </>:
                                    <>
                                    <MenuItem component={<Link to="/user/profile" />} icon={<DashboardIcon />}>User Dashboard</MenuItem>
                                    <MenuItem component={<Link to="/user/post/create" />} icon={<PostAddIcon />}>Create Post</MenuItem>
                                    </>
                            }

                        </Menu>
                    </Box>
                            <Box sx={{pb:2}}>
                                <Menu
                                    menuItemStyles={{
                                        button:{
                                            [`&.${menuClasses.button}`]:{
                                                color: '#000',
                                            },
                                            [`&.${menuClasses.disabled}`]: {
                                                color: "green",
                                            },
                                            '&:hover': {
                                                backgroundColor: '#fafafa',
                                                color: "#1976d2",
                                            },
                                        },
                                        icon:{
                                            [`&.${menuClasses.icon}`]:{
                                                color: '#1976d2',
                                            }
                                        },
                                    }}>
                                        <MenuItem onClick={logOut} icon={<LoginIcon />}>Log out</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                </Sidebar>
            </>
    )
}

export default SidebarAdm