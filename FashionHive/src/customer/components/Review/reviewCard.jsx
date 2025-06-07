import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createReview,
  getProductReviews,
  deleteReview,
  updateReview,
} from '../../../state/Reviews/Action.js'; // Adjust path as needed
import {
  createRating,
  getProductRatings,
  updateRating,
  deleteRating,
} from '../../../state/Ratings/Action.js'; // Adjust path as needed
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { getUser } from '../../../state/Auth/Action.js';

const ReviewCard = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productReviews, userReviews } = useSelector((state) => state.review);
  const { ratings } = useSelector((state) => state.rating);
  
  const [reviewText, setReviewText] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const { user } = useSelector((store) => store.auth);
  

  const userHasReviewed = user?.reviews?.some(reviewId => 
    productReviews?.some(review => review._id === reviewId)
  );

  const userRating = ratings?.find(rating => 
    rating.user === user?._id && rating.product === productId
  );
  
  useEffect(() => {
    if (productId) {
      dispatch(getProductReviews({ productId }));
      dispatch(getProductRatings(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (userRating) {
      setRatingValue(userRating.ratings);
    }
  }, [userRating]);

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      alert('Please enter a review');
      return;
    }
    
    if (editingReviewId) {
      dispatch(updateReview(editingReviewId, reviewText));
      setEditingReviewId(null);
    } else {
      dispatch(createReview(productId, reviewText));
    }
    setReviewText('');
  };

  const handleSubmitRating = () => {
    if (ratingValue === 0) {
      alert('Please select a rating');
      return;
    }
    
    const reqData = {
      productId,
      rating: ratingValue,
    };
    
    if (userRating) {
      dispatch(updateRating(reqData));
    } else {
      dispatch(createRating(reqData));
    }
  };

  const handleEditReview = (review) => {
    setReviewText(review.review);
    setEditingReviewId(review._id);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(reviewId));
    }
  };

  
  useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
          dispatch(getUser(jwt));
      }
  }, [dispatch]);
  if (!user) {
    // console.log("user in the reviewcard", user)
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg font-semibold">Please login to view your profile</p>
        </div>
    );
}
  // console.log("user in the reviewcard", user)
  
  const handleDeleteRating = () => {
    if (window.confirm('Are you sure you want to remove your rating?')) {
      dispatch(deleteRating(productId));
      setRatingValue(0);
    }
  };

  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.ratings, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
        
        {/* Average Rating Display */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Product Rating</h3>
          <div className="flex items-center">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl ${
                    star <= calculateAverageRating()
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-700">
              {calculateAverageRating()} ({ratings?.length || 0} ratings)
            </span>
          </div>
        </div>
        
        {/* Rating Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">
            {userRating ? 'Update Your Rating' : 'Rate This Product'}
          </h3>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingValue(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`text-2xl ${
                    star <= (hoverRating || ratingValue)
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSubmitRating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {userRating ? 'Update Rating' : 'Submit Rating'}
            </button>
            {userRating && (
              <button
                onClick={handleDeleteRating}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove Rating
              </button>
            )}
          </div>
        </div>
        
        {/* Review Section */}
        {!userHasReviewed ? (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Write a Review</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              onClick={handleSubmitReview}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingReviewId ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">
              You've already reviewed this product. You can edit your review below.
            </p>
          </div>
        )}
        
        {/* Reviews List */}
        <div>
          <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
          {productReviews?.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {productReviews?.map((review) => (
                <div key={review._id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{user?.firstName + " " + user?.lastName || 'Anonymous'}</h4>
                      <p className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {review.user?._id === user._id && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;