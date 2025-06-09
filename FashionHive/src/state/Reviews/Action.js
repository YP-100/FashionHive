import { api } from "../../config/apiConfig";
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAILURE,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
} from "./ActionType";

// Add review
export const createReview = (productId, reviewText) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const res = await api.post(
      `/api/reviews/create/${productId}`,
      { review: reviewText },
    );
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.response?.data?.error });
  }
};

// Get all reviews for a product
export const getProductReviews = (reqData) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST });
  try {
    const { productId } = reqData;
    const res = await api.get(`/api/reviews/product/${productId}`);
    dispatch({ type: GET_PRODUCT_REVIEWS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_REVIEWS_FAILURE, payload: error.response?.data?.error });
  }
};

// Get all reviews by a user
export const getUserReviews = (reqData) => async (dispatch) => {
  dispatch({ type: GET_USER_REVIEWS_REQUEST });
  try {
    const { userId } = reqData;
    const res = await api.get(`/api/reviews/user/${userId}`);
    dispatch({ type: GET_USER_REVIEWS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_USER_REVIEWS_FAILURE, payload: error.response?.data?.error });
  }
};

// Delete a review
export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    await api.delete(`/api/reviews/delete/${reviewId}`);
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.response?.data?.error });
  }
};

// Update a review
export const updateReview = (reviewId, reviewText, token) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/reviews/update/${reviewId}`,
      { review: reviewText },
    );
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.response?.data?.error });
  }
};
