import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {toast} from 'react-toastify';



const PostCard = ({
    id, title, subheader, 
    image, content, comments, 
    likes, showPosts, likesId
}) => {
  console.log(id);
    const {userInfo}= useSelector(state => state.signIn);

    //  //add Comment
    //  const addComment= async() => {
    //   try{
    //     const {data}= await axios.put(`/api/comment/post/${id}`);
    //     // console.log("Comment", data.post);
    //     if(data.success === true){
    //       showPosts();
    //     }
    //   }catch(error){
    //     console.log(error);
    //     toast.error(error.response.data.error);
    //   }
    // }

        //add like
      const addLike= async() => {
        try{
          const {data}= await axios.put(`/api/addlike/post/${id}`);
          console.log("likes", data.post);
          if(data.success === true){
            showPosts();
          }
        }catch(error){
          console.log(error);
          toast.error(error.response.data.error);
        }
      }

      //remove like
      const removeLike= async() => {
        try{
          const {data}= await axios.put(`/api/removeLike/post/${id}`);
          console.log("remove like", data.post);
          if(data.success === true){
            showPosts();
          }
        }catch(error){
          console.log(error);
        }
      }

  return(
      <Card sx={{ maxWidth: 345 }}>

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              
            </Avatar>
          }
          title={title}
          subheader={subheader}
          />

          <Link to={`/post/${id}`}>
            <CardMedia
              component="img" 
              height="194"
              image= {image}
              alt=""
            />
          </Link>

          <CardContent>
          <Typography variant="body2" color="text.secondary">
            {/*Content here*/}
            <Box component='span' dangerouslySetInnerHTML={{ __html: (content).split(" ").slice(0, 10).join(" ") + "..."}}></Box>
            {/* {content && (
            <Box component='span' dangerouslySetInnerHTML={{ __html:content.split(" ").slice(0, 10).join(" ") + "..."}}></Box>)} */}
            </Typography>
        </CardContent>

        <CardActions>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                  
                <Box>
                 { likesId.includes(userInfo && userInfo.id) ?
                //  { likesId ?
                      <IconButton onClick={removeLike} aria-label='remove from favorites'>
                           <FavoriteBorderIcon sx={{ color: 'red'}} />
                      </IconButton>
                 :
                      <IconButton onClick={addLike} aria-label='add to favorites'>
                          <FavoriteBorderIcon sx={{ color: 'red'}} />
                      </IconButton>
                
                  }
                   {likes} Like(s)
                </Box>

                <Box>
                  {comments} 
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                  {/* <IconButton onClick={addComment} aria-label="write comment">
                    <CommentIcon />
                  </IconButton> */}
                </Box>

          </Box>
        </CardActions>    
        
        

    </Card>
  );
}

export default PostCard;

    
