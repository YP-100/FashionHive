import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "./ActionType";
import toast from "react-hot-toast";

const token = localStorage.getItem("jwt");

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (jwt,user) => ({ type: REGISTER_SUCCESS, payload: {jwt,user} });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    if (userData.resend) {
      await api.post(`${API_BASE_URL}/api/users/initiate-signup`, {
        email: userData.email,
      });
      toast.success("New OTP sent to your email!");
      return;
    }

    if (userData.otp) {
      const response = await api.post(
        `${API_BASE_URL}/auth/signup`,
        userData
      );
      const user = response.data;

      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
        dispatch(registerSuccess(user.jwt));
        dispatch(getUser(user.jwt));

      }
      return;
    }

    await api.post(`${API_BASE_URL}/api/users/initiate-signup`, {
      email: userData.email,
    });
    toast.success("OTP sent to your email!");
    return { otpSent: true }; 
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    dispatch(registerFailure(errorMessage));
    toast.error(errorMessage);
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (jwt,user) => ({ type: LOGIN_SUCCESS, payload: {jwt,user} });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    // console.log("user", user);
    dispatch(loginSuccess(user.jwt));
    toast.success("Login successful!");
  } catch (error) {
    // dispatch(loginFailure(error.message));
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await api.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    await api.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
    toast.success("OTP sent to your email!");
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const resetPassword = (data) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    await api.post(`${API_BASE_URL}/api/users/reset-password`, data);
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
