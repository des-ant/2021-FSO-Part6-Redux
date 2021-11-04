import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();
  // Sort anecdotes by number of votes, descending
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  );
};

export default App;