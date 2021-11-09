const initialState = null;
// Identifies timer created by the call to setTimeout()
// Will be passed to clearTimeout() to cancel the timeout on new notification
let timeoutID = null;

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
    // Cancel removal of previous notification when a new notification is displayed
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
      },
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: null,
      });
    }, (durationInSeconds * 1000));
  };
};

export default notificationReducer;