import React from 'react';
import { Avatar, Box, Grid, Rating } from '@mui/material';

const ProductReviewCard = ({ review , allratings }) => {
  // console.log("review in product review card",review)
  // console.log("allratings in product review card",allratings)

  const userRating = allratings.find(rating => 
    rating.user === review.user._id || 
    rating.user._id === review.user._id 
  );
  

  
  return (
    <Box sx={{ p: 2 ,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      boxShadow: 1,
      backgroundColor: 'white',
    }} >
      <Grid container spacing={2}  alignItems="center">

        {/* Avatar */}
        <Grid size={{ xs: 2 } } >
          <Box display="flex" justifyContent="center">

          <Avatar sx={{ width: 56, height: 56, bgcolor: '#ca8a04', color: 'white' }}>
            {review?.user?.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          </Box>
        </Grid>

        {/* Text and Rating */}
        <Grid size={{ xs: 10 }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box>
              <p className="font-semibold text-lg">{review?.user?.firstName+" "+review?.user?.lastName}</p>
              <p className="opacity-70 text-sm">{review?.createdAt.slice(0, 10)}</p>
            </Box>
            <Box>
            <Rating value={userRating?.ratings || 0}  name="half-rating" readOnly precision={0.5} />
            </Box>

            <p>{review?.review}</p>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ProductReviewCard;

