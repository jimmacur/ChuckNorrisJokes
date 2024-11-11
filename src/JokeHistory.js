import React from 'react';
import './JokeHistory.css';

function JokeHistory({ jokeHistory, deleteJoke }) {
  return (
    <section className='joke-history'>
      <h2>Joke History</h2>
      <ul>
        {jokeHistory.map((joke, index) => (
          <li key={index}>
            {joke}
            <button onClick={() => deleteJoke(index)} className='delete-button'>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default JokeHistory;