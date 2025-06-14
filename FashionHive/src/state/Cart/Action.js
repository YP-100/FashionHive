import { api } from "../../config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const getCart = () => async (dispatch, getState) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { auth } = getState();
    const jwt = auth.jwt || localStorage.getItem("jwt"); 
    
    if (!jwt) {
      return dispatch({ type: GET_CART_SUCCESS, payload: { cartItems: [] } });
    }
    
    const { data } = await api.get(`/api/cart`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error getting cart:", error);
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};


export const addItemToCart = (reqData) => async (dispatch, getState) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  
  const { auth } = getState();
  const jwt = auth.jwt || localStorage.getItem("jwt"); 
  
  if (!jwt) {
    dispatch({
      type: 'SHOW_LOGIN_PROMPT',
      payload: "Please login to add items to your cart"
    });
    return dispatch({ 
      type: ADD_ITEM_TO_CART_FAILURE, 
      payload: "Login required" 
    });
  }

  try {
    const { data } = await api.put(`/api/cart/add`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    console.error("Add to cart error:", error);
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  
  try {
    const { data } = await api.delete(
      `/api/cart_items/${cartItemId}`);
      // console.log("remove cart item data: ", data)
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {

  // console.log("reqData in updateCartItem:", reqData);
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(
      // `/api/cart_items/${reqData.cartItem._Id}`,
      `/api/cart_items/${reqData.cartItemId}`,
      // reqData.data


      { quantity: reqData.data.quantity } 
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};
