import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';



const PostCard = () =>{
  return(
    <Card sx={{ maxWidth: 345 }}>

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              K
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          />

          <Link to={''}>
            <CardMedia
              component="img" 
              height="194"
              image= ""
              alt="Ketsi"
            />
          </Link>

          <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>

        <CardActions>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                  
                <Box>
                  <IconButton aria-label="add to favorites">
                      <FavoriteBorderIcon sx={{ color: 'red'}} />
                  </IconButton>

                  2 Like(s)
                </Box>

                <Box>
                  3
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </Box>

                <Box>
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                </Box>

          </Box>
        </CardActions>    
        
        

    </Card>
  );
}

export default PostCard

    
