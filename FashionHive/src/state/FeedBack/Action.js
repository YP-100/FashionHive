import { api } from "../../config/apiConfig";
import {
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAIL,
    GET_FEEDBACK_REQUEST,
    GET_FEEDBACK_SUCCESS,
    GET_FEEDBACK_FAIL,
    UPDATE_FEEDBACK_REQUEST,
    UPDATE_FEEDBACK_SUCCESS,
    UPDATE_FEEDBACK_FAIL,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,
    CLEAR_FEEDBACK_ERRORS,
    CLEAR_FEEDBACK_MESSAGE,
    GET_ALL_FEEDBACKS_REQUEST,
    GET_ALL_FEEDBACKS_SUCCESS,
    GET_ALL_FEEDBACKS_FAIL,
} from "./ActionType";

export const createFeedback = (feedbackData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_FEEDBACK_REQUEST });

        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await api.post("/api/feedback", feedbackData, config);
            dispatch({ type: CREATE_FEEDBACK_SUCCESS, payload: response.data.feedback });
        } catch (error) {
            dispatch({
                type: CREATE_FEEDBACK_FAIL,
                payload: error.response?.data?.message || error.message,
            });
        }
    };
};

export const getFeedback = () => {
    return async (dispatch) => {
        dispatch({ type: GET_FEEDBACK_REQUEST });

        try {
            const { data } = await api.get("/api/feedback");
            dispatch({ 
                type: GET_FEEDBACK_SUCCESS, 
                payload: data // Note: Not data.feedback since your API returns the feedback object directly
            });
        } catch (error) {
            dispatch({
                type: GET_FEEDBACK_FAIL,
                payload: error.response?.data?.message || error.message,
            });
        }
    };
}

export const updateFeedback = (feedbackData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_FEEDBACK_REQUEST });

        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await api.put("/api/feedback", feedbackData, config);
            dispatch({ type: UPDATE_FEEDBACK_SUCCESS, payload: response.data.feedback });
        } catch (error) {
            dispatch({
                type: UPDATE_FEEDBACK_FAIL,
                payload: error.response?.data?.message || error.message,
            });
        }
    };
};

export const deleteFeedback = () => {
    return async (dispatch) => {
        dispatch({ type: DELETE_FEEDBACK_REQUEST });

        try {
            await api.delete("/api/feedback");
            dispatch({ type: DELETE_FEEDBACK_SUCCESS });
        } catch (error) {
            dispatch({
                type: DELETE_FEEDBACK_FAIL,
                payload: error.response?.data?.message || error.message,
            });
        }
    };
};

export const clearErrors = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_FEEDBACK_ERRORS });
    };
};

export const clearMessages = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_FEEDBACK_MESSAGE });
    };
};

export const getAllFeedbacks = (data) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_FEEDBACKS_REQUEST });

        try {
            const { pageNumber = 1, pageSize = 10, searchQuery = "", rating = "" } = data;
            const response = await api.get(
                `/api/feedback/all?page=${pageNumber}&limit=${pageSize}` +
                `${searchQuery ? `&search=${searchQuery}` : ''}` +
                `${rating ? `&rating=${rating}` : ''}`
            );
            
            dispatch({ 
                type: GET_ALL_FEEDBACKS_SUCCESS, 
                payload: response.data 
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_FEEDBACKS_FAIL,
                payload: error.response?.data?.message || error.message,
            });
        }
    };
};
