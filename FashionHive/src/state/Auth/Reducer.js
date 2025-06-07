// import {
//   FORGOT_PASSWORD_SUCCESS,
//   GET_USER_FAILURE,
//   GET_USER_REQUEST,
//   GET_USER_SUCCESS,
//   LOGIN_FAILURE,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGOUT,
//   REGISTER_FAILURE,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   RESET_PASSWORD_SUCCESS,
// } from "./ActionType";

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
//   jwt: null,
//   passwordReset: false,
// };

// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REGISTER_REQUEST:
//     case LOGIN_REQUEST:
//     case GET_USER_REQUEST:
//       return { ...state, isLoading: true, error: null };

//     case REGISTER_SUCCESS:
//     case LOGIN_SUCCESS:
//       //   return { ...state, isLoading: false, jwt: action.payload, error: null };
//       return {
//         ...state,
//         isLoading: false,
//         jwt: action.payload,
//         error: null,
//       };
//     case GET_USER_SUCCESS:
//       return { ...state, isLoading: false, user: action.payload, error: null };

//     case REGISTER_FAILURE:
//     case LOGIN_FAILURE:
//     case GET_USER_FAILURE:
//       return { ...state, isLoading: false, error: action.payload };

//     case LOGOUT:
//       return { ...initialState };

//     case FORGOT_PASSWORD_SUCCESS:
//       return { ...state, isLoading: false };

//     case RESET_PASSWORD_SUCCESS:
//       return { ...state, isLoading: false, passwordReset: true };

//     default:
//       return state;
//   }
// };
import {
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
  RESET_PASSWORD_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  passwordReset: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //   return { ...state, isLoading: false, jwt: action.payload, error: null };
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        error: null,
      };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case LOGOUT:
      return { ...initialState };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, isLoading: false };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, passwordReset: true };

    default:
      return state;
  }
};
