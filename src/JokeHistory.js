import React from 'react';
import './JokeHistory.css';

function JokeHistory({ jokeHistory, deleteJoke }) {
  return (
    <section className='joke-history'>
      <ul>
        {jokeHistory.map((joke, index) => (
          <li key={index}>
            {joke}
            <button 
              onClick={(event) => {
                event.stopPropagation();
                deleteJoke(index)}
              }
              className='delete-button'>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default JokeHistory;