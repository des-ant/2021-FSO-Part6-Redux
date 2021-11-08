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

export const setNotification = (message, durationInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
      },
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: null,
      });
    }, (durationInSeconds * 1000));
  };
};

export default notificationReducer;