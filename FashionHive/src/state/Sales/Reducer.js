import { FETCH_SALES_FAILURE, FETCH_SALES_REQUEST, FETCH_SALES_SUCCESS } from "./ActionType";


const initialState = {
  loading: false,
  salesData: null,
  error: null,
  overall: {
    totalSales: 0,
    totalItemsSold: 0
  },
  dailySales: []
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        salesData: action.payload,
        overall: action.payload.overall,
        dailySales: action.payload.dailySales,
        error: null
      };
    
    case FETCH_SALES_FAILURE:
      return {
        ...state,
        loading: false,
        salesData: null,
        error: action.payload
      };
    
    default:
      return state;
  }
};