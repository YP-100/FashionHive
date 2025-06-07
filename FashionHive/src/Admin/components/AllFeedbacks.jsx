import { 
  Avatar, 
  Button, 
  Card, 
  CardHeader, 
  Pagination, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  Rating,
  Box,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllFeedbacks } from '../../state/FeedBack/Action';

const AllFeedbacks = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading } = useSelector(store => store.feedback);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pagination state
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const [pageNumber, setPageNumber] = useState(initialPage);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    dispatch(getAllFeedbacks({
        pageNumber: 1,
        pageSize: 10
    }));
}, [dispatch]);

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
    navigate(`?page=${value}`);
  };

  return (
    <div className='p-5'>
      <Card className='mt-2'>
        <CardHeader title="All User Feedbacks" />
        
        {/* Filter Section */}
        <div className='flex gap-5 p-5'>
          <TextField
            select
            label="Filter by Rating"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Ratings</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
          </TextField>

          <TextField
            label="Search Feedback"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>

        {/* Feedback Table */}
        <TableContainer sx={{ bgcolor: "#f5f2f2" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="feedback table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Likes</TableCell>
                <TableCell align="left">Dislikes</TableCell>
                <TableCell align="left">Rating</TableCell>
                <TableCell align="left">Suggestions</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks?.content?.map((feedback) => (
                <TableRow
                  key={feedback._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar  sx={{
                        bgcolor: "#ca8a04",
                        color: "white",
                        cursor: "pointer",
                        textTransform: 'uppercase' 
                      }}
                      src={feedback?.user?.firstName[0]} alt={feedback?.user?.firstName} />
                      <Typography>
                        {feedback?.user?.firstName} {feedback?.user?.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left" sx={{ maxWidth: 200 }}>
                    <Typography noWrap>{feedback?.likes}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ maxWidth: 200 }}>
                    <Typography noWrap>{feedback?.dislikes}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Rating value={feedback?.rating} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell align="left" sx={{ maxWidth: 200 }}>
                    <Typography noWrap>{feedback?.suggestions || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {new Date(feedback?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <section className='w-full px=[3.5rem]'>
          <div className='px-4 py-5 flex justify-center'>
            <Pagination 
              count={feedbacks?.totalPages}   
              page={pageNumber} 
              onChange={handlePaginationChange}
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#ca8a04',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ca8a04',
                  },
                },
              }} 
            />
          </div>
        </section>
      </Card>
    </div>
  );
};

export default AllFeedbacks;