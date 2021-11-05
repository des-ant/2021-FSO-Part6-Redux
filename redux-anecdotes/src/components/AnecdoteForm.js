import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange, notificationRemove } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    // Get anecdote content from text input
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(notificationChange(`you added '${content}'`));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;