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
    GET_ALL_FEEDBACKS_SUCCESS,
    GET_ALL_FEEDBACKS_FAIL,
    GET_ALL_FEEDBACKS_REQUEST
} from './ActionType';

const initialState = {
    feedback: null,      
    feedbacks: {          
        content: [],
        totalPages: 0
    },
    loading: false,
    error: null,
    message: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false
};

export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FEEDBACK_REQUEST:
        case GET_FEEDBACK_REQUEST:
        case UPDATE_FEEDBACK_REQUEST:
        case DELETE_FEEDBACK_REQUEST:
            return {
                ...state,
                loading: true
            };

        case CREATE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
                feedback: action.payload,
                message: 'Feedback submitted successfully!',
                error: null
            };

        case GET_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                feedback: action.payload
            };

        case UPDATE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                feedback: action.payload,
                message: 'Feedback updated successfully!'
            };

        case DELETE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
                feedback: null,
                message: 'Feedback deleted successfully!'
            };

        case CREATE_FEEDBACK_FAIL:
        case GET_FEEDBACK_FAIL:
        case UPDATE_FEEDBACK_FAIL:
        case DELETE_FEEDBACK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_FEEDBACK_ERRORS:
            return {
                ...state,
                error: null
            };

        case CLEAR_FEEDBACK_MESSAGE:
            return {
                ...state,
                message: null,
                isCreated: false,
                isUpdated: false,
                isDeleted: false
            };

            case GET_ALL_FEEDBACKS_REQUEST:
                return {
                    ...state,
                    loading: true
                };
                
            case GET_ALL_FEEDBACKS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    feedbacks: {
                        content: action.payload.feedbacks || action.payload, // Handle both formats
                        totalPages: action.payload.totalPages || 1
                    }
                };
                
            case GET_ALL_FEEDBACKS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };

        default:
            return state;
    }
};