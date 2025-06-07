import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    // const { data } = await api.post(`/api/orders/`, reqData.address);

    
    // console.log("Sending order data to server:", reqData.address); // Log the request data
    const { data } = await api.post(`/api/orders/`, reqData.address)

    // console.log("Order created successfully:", data);

  
    if (data._id) {

      // console.log("Attempting navigation with order ID:", data._id);
      // reqData.navigate({ search: `step=3&order_id=${data.id}` });


      reqData.navigate(`/checkout?step=3&order_id=${data._id}`);
    }
    // console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.group("Error creating order");
    console.error("Full error object:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error headers:", error.response?.headers);
    console.error("Error config:", error.config);
    console.log("catch error : ", error);
    console.groupEnd();
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    // console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ", error);


    console.error("Full error details:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config,
      stack: error.stack
    });
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      // payload: error.message,


      payload: error.response?.data?.message || error.message,
    });
  }
};


export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/user`);
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
