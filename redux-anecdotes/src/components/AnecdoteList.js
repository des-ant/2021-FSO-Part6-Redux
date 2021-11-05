import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { notificationChange, notificationRemove } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // If text present in filter field,
    // Use text to filter names (case-insensitive)
    // Else if no text present, show all anecdotes
    if ( !filter || filter === '' ) {
      return anecdotes;
    }
    return anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()));
  });
  const dispatch = useDispatch();
  // Sort anecdotes by number of votes, descending
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(notificationChange(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(notificationRemove());
    }, 5000);
  };

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => voteAnecdote(anecdote)}
        />
      )}
    </div>
  );
};

export default AnecdoteList;