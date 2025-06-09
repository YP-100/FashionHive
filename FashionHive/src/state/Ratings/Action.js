import { api } from "../../config/apiConfig";
import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, DELETE_RATING_FAILURE, DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, GET_PRODUCT_RATINGS_FAILURE, GET_PRODUCT_RATINGS_REQUEST, GET_PRODUCT_RATINGS_SUCCESS, UPDATE_RATING_FAILURE, UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS } from "./ActionType";

export const createRating = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });
    try {
      const res = await api.post("/api/ratings/create", reqData);
      dispatch({ type: CREATE_RATING_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: CREATE_RATING_FAILURE, payload: error.response?.data?.error });
    }
  };
  
  export const getProductRatings = (productId) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_RATINGS_REQUEST });
    try {
      const res = await api.get(`/api/ratings/product/${productId}`);
      dispatch({ type: GET_PRODUCT_RATINGS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_RATINGS_FAILURE, payload: error.response?.data?.error });
    }
  };
  
  export const updateRating = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_RATING_REQUEST });
    try {
      const res = await api.put("/api/ratings/update", reqData);
      dispatch({ type: UPDATE_RATING_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_RATING_FAILURE, payload: error.response?.data?.error });
    }
  };
  
  export const deleteRating = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_RATING_REQUEST });
    try {
      await api.delete(`/api/ratings/delete/${productId}`);
      dispatch({ type: DELETE_RATING_SUCCESS, payload: productId });
    } catch (error) {
      dispatch({ type: DELETE_RATING_FAILURE, payload: error.response?.data?.error });
    }
  };