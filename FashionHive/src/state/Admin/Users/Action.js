import * as actionTypes from './ActionType';
import { api } from '../../../config/apiConfig'; 

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_USERS_REQUEST });
  try {
    const { data } = await api.get('/api/users');
    dispatch({
      type: actionTypes.GET_ALL_USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_USERS_FAILURE,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

export const updateUserRole = ({ userId, role }) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_ROLE_REQUEST });
  try {
    const { data } = await api.put(`/api/users/${userId}/role`, { role });
    dispatch({
      type: actionTypes.UPDATE_USER_ROLE_SUCCESS,
      payload: data
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_USER_ROLE_FAILURE,
      payload: error.response ? error.response.data.message : error.message
    });
    return Promise.reject();
  }
};