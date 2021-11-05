import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      // Return new array with data of previous state and newly added anecdote
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE': {
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      // Return new state with updated anecdote
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;