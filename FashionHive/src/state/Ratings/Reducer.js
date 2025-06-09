import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, DELETE_RATING_FAILURE, DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, GET_PRODUCT_RATINGS_FAILURE, GET_PRODUCT_RATINGS_REQUEST, GET_PRODUCT_RATINGS_SUCCESS, UPDATE_RATING_FAILURE, UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS } from "./ActionType";

const initialState = {
    ratings: [],
    loading: false,
    error: null,
  };
  
  export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_RATING_REQUEST:
      case GET_PRODUCT_RATINGS_REQUEST:
      case UPDATE_RATING_REQUEST:
      case DELETE_RATING_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_RATING_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: [...state.ratings, action.payload],
        };
  
      case GET_PRODUCT_RATINGS_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: action.payload,
        };
  
      case UPDATE_RATING_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: state.ratings.map((rating) =>
            rating._id === action.payload._id ? action.payload : rating
          ),
        };
  
      case DELETE_RATING_SUCCESS:
        return {
          ...state,
          loading: false,
          ratings: state.ratings.filter((rating) => rating.product !== action.payload),
        };
  
      case CREATE_RATING_FAILURE:
      case GET_PRODUCT_RATINGS_FAILURE:
      case UPDATE_RATING_FAILURE:
      case DELETE_RATING_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };