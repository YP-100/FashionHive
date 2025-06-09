


import toast from 'react-hot-toast'

import { api, } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./ActionType";


export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST});
  const {
    colors,
    title,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
try {
  // Start with base query string
  let queryString = `color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  
  if (title) {
    queryString += `&title=${encodeURIComponent(title)}`;
  }

  const {data} = await api.get(`/api/products?${queryString}`);
  
  dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
} catch (error) {
  dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
}
};



export const findProductsById = (reqData) => async(dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    // console.log("data", data);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product)=> async(dispatch)=>{
  try {
    dispatch ({type: CREATE_PRODUCT_REQUEST});

    const {data} = await api.post(`/api/admin/products`, product);

    // alert("Product created successfully");
    // console.log("data of created product", data);
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    })

    toast.custom((t) => (
      <div
        className={`bg-yellow-400 text-white px-6 py-4 rounded shadow-lg ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        ✅ Product created successfully!
      </div>
    ))
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
}

export const deleteProduct = (productId)=> async(dispatch)=>{
  try {
    dispatch ({type: DELETE_PRODUCT_REQUEST});

    const {data} = await api.delete(`/api/admin/products/${productId}/delete`);

    // console.log("data in productsTable", data);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    })
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
}

