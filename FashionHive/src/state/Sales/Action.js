import { api } from '../../config/apiConfig';
import { FETCH_SALES_FAILURE, FETCH_SALES_REQUEST, FETCH_SALES_SUCCESS } from './ActionType';


export const fetchSalesRequest = () => ({
  type: FETCH_SALES_REQUEST
});

export const fetchSalesSuccess = (salesData) => ({
  type: FETCH_SALES_SUCCESS,
  payload: salesData
});

export const fetchSalesFailure = (error) => ({
  type:FETCH_SALES_FAILURE,
  payload: error
});

export const fetchSalesData = () => {
  return async (dispatch) => {
    dispatch(fetchSalesRequest());
    try {
      const { data } = await api.get(`api/sales/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      dispatch(fetchSalesSuccess(data));
    } catch (error) {
      dispatch(fetchSalesFailure(error.message));
    }
  };
};