import * as actionTypes from './ActionType';

const initialState = {
  users: [],
  loading: false,
  error: null
};

export const alluserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null
      };
    case actionTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case actionTypes.UPDATE_USER_ROLE_REQUEST:
  return {
    ...state,
    loading: true,
    error: null
  };
case actionTypes.UPDATE_USER_ROLE_SUCCESS:
  return {
    ...state,
    loading: false,
    users: state.users.map(user => 
      user._id === action.payload._id ? action.payload : user
    ),
    error: null
  };
case actionTypes.UPDATE_USER_ROLE_FAILURE:
  return {
    ...state,
    loading: false,
    error: action.payload
  };
    default:
      return state;
  }
};