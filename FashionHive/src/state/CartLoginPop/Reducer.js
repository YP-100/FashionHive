const initialState = {
    showLoginPrompt: false,
    loginMessage: ''
  };
  
  export const CartLoginPopReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_LOGIN_PROMPT':
        return {
          ...state,
          showLoginPrompt: true,
          loginMessage: action.payload
        };
      case 'HIDE_LOGIN_PROMPT':
        return initialState;
      default:
        return state;
    }
  };