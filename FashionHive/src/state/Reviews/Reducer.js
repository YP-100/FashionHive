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
  
  const initialState = {
    loading: false,
    productReviews: [],
    userReviews: [],
    error: null,
  };
  
  export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
      case GET_PRODUCT_REVIEWS_REQUEST:
      case GET_USER_REVIEWS_REQUEST:
        return { ...state, loading: true };
  
      case CREATE_REVIEW_SUCCESS:
        return { ...state, loading: false, productReviews: [...state.productReviews, action.payload] };
  
      case GET_PRODUCT_REVIEWS_SUCCESS:
        return { ...state, loading: false, productReviews: action.payload };
  
      case GET_USER_REVIEWS_SUCCESS:
        return { ...state, loading: false, userReviews: action.payload };
  
      case CREATE_REVIEW_FAILURE:
      case GET_PRODUCT_REVIEWS_FAILURE:
      case GET_USER_REVIEWS_FAILURE:
      case DELETE_REVIEW_FAILURE:
      case UPDATE_REVIEW_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          productReviews: state.productReviews.filter((r) => r._id !== action.payload),
          userReviews: state.userReviews.filter((r) => r._id !== action.payload),
        };
  
      case UPDATE_REVIEW_SUCCESS:
        return {
          ...state,
          productReviews: state.productReviews.map((r) => r._id === action.payload._id ? action.payload : r),
          userReviews: state.userReviews.map((r) => r._id === action.payload._id ? action.payload : r),
        };
  
      default:
        return state;
    }
  };
  