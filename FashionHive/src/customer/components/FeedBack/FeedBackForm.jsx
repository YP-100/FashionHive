import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Grid,
  TextField,
  Typography,
  Rating,
  Box,
  Alert,
  Card,
  CardContent,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createFeedback, deleteFeedback, getFeedback, updateFeedback } from '../../../state/FeedBack/Action';


const FeedbackForm = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    likes: '',
    dislikes: '',
    rating: 5,
    suggestions: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();


  const {
    feedback = null,
    loading = false,
    error = null,
    message = null
  } = useSelector(store => store.feedback) || {};

  useEffect(() => {
    console.log('Dispatching getFeedback');
    dispatch(getFeedback());
  }, [dispatch]);

  useEffect(() => {
    // console.log('Feedback from store:', feedback);
    if (feedback) {
      setFeedbackData({
        likes: feedback.likes || '',
        dislikes: feedback.dislikes || '',
        rating: feedback.rating || 5,
        suggestions: feedback.suggestions || ''
      });
    }
  }, [feedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setFeedbackData(prev => ({ ...prev, rating: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback) {
      dispatch(updateFeedback(feedbackData));
    } else {
      dispatch(createFeedback(feedbackData));
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteFeedback(feedback._id));
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  if (feedback && !isEditing) {
    return (
      <Card sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Your Feedback
          </Typography>
          <div>
          <IconButton onClick={handleEditClick} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick} color="error">
            <DeleteIcon />
          </IconButton>
          </div>
        </Box>

        <Divider sx={{ my: 2 }} />

        <CardContent>
          <Box mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              What you liked:
            </Typography>
            <Typography variant="body1">{feedback.likes}</Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Areas for improvement:
            </Typography>
            <Typography variant="body1">{feedback.dislikes}</Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Your rating:
            </Typography>
            <Rating value={feedback.rating} precision={0.5} readOnly />
          </Box>

          {feedback.suggestions && (
            <Box mb={3}>
              <Typography variant="subtitle1" color="text.secondary">
                Additional suggestions:
              </Typography>
              <Typography variant="body1">{feedback.suggestions}</Typography>
            </Box>
          )}
          <Box>
          </Box>
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Feedback?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your feedback? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Typography variant="caption" color="text.secondary">
            Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {feedback ? 'Edit Your Feedback' : 'Share Your Feedback'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="What did you like about our website?"
              name="likes"
              value={feedbackData.likes}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="What could be improved?"
              name="dislikes"
              value={feedbackData.dislikes}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Your Rating:</Typography>
              <Rating
                name="rating"
                value={feedbackData.rating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Any additional suggestions?"
              name="suggestions"
              value={feedbackData.suggestions}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Submitting...' : feedback ? 'Update Feedback' : 'Submit Feedback'}
            </Button>

            {feedback && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => setIsEditing(false)}
                fullWidth
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FeedbackForm;