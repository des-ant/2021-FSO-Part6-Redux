const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {...state, message: action.data.message};
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const notificationChange = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message,
    }
  };
};

export const notificationRemove = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: null
  };
};

export default notificationReducer;