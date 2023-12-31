import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Container, Grid } from "@mui/material";
import PostCard from "../components/PostCard";
import moment from "moment";
import axios from "axios";
import Loader from "../components/Loader";


const Home= () =>{

    const [posts, setPosts]= useState([]);
    const [loading, setLoading]= useState(false);


    //display posts
    const showPosts= async () => {
        setLoading(true);
        try{
            const {data} = await axios.get('/api/posts/show');
            setPosts(data.posts);
            setLoading(false);
        }catch(error){
            console.log(error.response.data.error);
        }
    }
    useEffect(()=>{
        showPosts();
    }, []);


// //show posts
//     useEffect(()=>{
//         axios.get('/api/posts/show').then((res) => {
//             setPosts(res.data); });
//     }, []);


    return(
        <>
            <Box sx={{bgcolor: '#fafafa', minHeight: '100vh'}}>

                <Navbar />
                <Container sx={{pt: 5, pb: 5, minHeight: '83vh'}}>
                        <Box sx={{flexGrow: 1}}>

                            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>  
                                {
                                    loading ? <Loader /> : 
                                    // posts && posts.map((post, index) =>(
                                    posts && posts.map((post) =>(
                                        
                                        // <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Grid item xs={2} sm={4} md={4} key={post._id}>
                                            <PostCard
                                                id={post._id}
                                                title={post.title}
                                                content={post.content}
                                                image={post.image ? post.image.url : ''}
                                                // subheader={moment(post.createdAt).format('MMM DD, YYYY')}
                                                subheader={post.createdAt ? moment(post.createdAt).format('MMM DD, YYYY') : ''}
                                                // comments={post.comments.length}
                                                comments={post.comments ? post.comments.length : 0}
                                                // likes={post.likes.length}
                                                likes={post.likes ? post.likes.length : 0}
                                                likesId={post.likes}
                                                showPosts={showPosts}
                                             />
                                        </Grid>    
                                    ))
                                }

                            </Grid>

                        </Box>
                </Container>
                <Footer />

            </Box>
        </>
    )
}

export default Home;