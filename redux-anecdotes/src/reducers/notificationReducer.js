const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {...state, message: action.data.message};
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message,
    }
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: null
  };
};

export default notificationReducer;