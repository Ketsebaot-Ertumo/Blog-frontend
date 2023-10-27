import React from "react";
import {Link, useParams} from 'react-router-dom';
import  Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia  from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from "moment";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import {toast} from 'react-toastify';
import CommentList from '../components/CommentList';



const Singlepost= () =>{
    const {userInfo}= useSelector(state => state.signIn);
    
    const [title, setTitle]= useState('');
    const [content, setContent]= useState('');
    const [image, setImage]= useState('');
    const [createdAt, setCreatedAt]= useState('');
    const [loading, setLoading]= useState(false);
    const [comment, setComment]= useState('');
    const [Comments, setComments]= useState([]);
    //const [likes, setLikes]= useState([]),


    // const _id= useParams();
    const {id}= useParams();
    // const postId = id._id;
    // const {_id}=id;
    console.log(userInfo);

    //fetch single post
    const dispalySinglePost= async (id) => {
        console.log('Singlepost component rendered');
        setLoading(true);
        // console.log(_id);
        try{
            const {data}= await axios.get(`/api/post/${id}`);
            console.log(Comments.length);
            setTitle(data.post.title);
            setContent(data.post.content);
            setImage(data.post.image.url);
            setCreatedAt(data.post.createdAt);
            setLoading(false);
            setComments(data.post.Comments || []);
            // setLikes(data.post.likes);
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        dispalySinglePost(id);
    }, [id])

    
    //add comment
    const addComment= async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`/api/comment/post/${id}`, {comment});
            if(data.success === true){
                setComment('');
                toast.success("comment added");
                dispalySinglePost(id);
            }
            console.log("comment post", data.post);
        }catch(error){
            console.log(error);
            toast.error(error);
        }
    }


return(
    <>
        <Navbar />
        <Box sx={{bgcolor: "#fafafa", display: 'flex', justifyContent: 'center', pt:4, pb:4, minHeight:'100vh'}}>
          {
            loading ? <Loader /> : 
            <>
                <Card sx={{maxWidth: 1000, height: '100%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500] }} aria-label="recipe">
                                {/* K */}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={title}
                        subheader={moment(createdAt).format('dddd, MMM DD, YYYY')}
                    />
                        <CardMedia
                            component='img'
                            height='194' 
                            image={image}
                            alt={title}
                        />
                        <CardContent>
                            <Typography variant='body2' color='text-secondary'>
                                <Box component='span' dangerouslySetInnerHTML={{__html: content}} >
                                </Box>
                            </Typography>
                            <Divider variant='inset' />
                            {/* add comment list */}
                            {   
                                Comments.length === 0 ? '' : (
                                    <Typography variant="h5" sx={{pt: 3, mb: 2}}>
                                        Comments: 
                                    </Typography>
                            )}
                            {
                                Comments.map(comment => (
                                    <CommentList key={comment._id} name={comment.postedBy.name} text={comment.text} />

                                ))
                            }
                            {
                                userInfo ? 
                                <>
                                    <Box sx={{pt:1, pl:3, pb:3, bgcolor: "#fafafa" }}>
                                        <h2>Add your comment here!</h2>
                                        <form onSubmit={addComment}>
                                            <TextareaAutosize
                                                onChange={(e) => setComment(e.target.value)}
                                                value={comment}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Add a comment..."
                                                style={{width: 500, padding: "5px"}}
                                           />
                                               <Box sx={{pt:1}}>
                                                    <Button type='submit' variant='contained'>
                                                        Comment
                                                    </Button>
                                               </Box>
                                        </form>
                                    </Box>
                                </>
                                :
                                <>
                                    <Link to='/logIn'>Log In to add a comment</Link>
                                </>
                            }
                        </CardContent>
                        
                </Card>
            </>
            }
        </Box>
        <Footer />
        </>
    );
}

export default Singlepost;