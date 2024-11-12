import { useState } from 'react';
import JokeHistory from './JokeHistory';
import './App.css';

function App() {
  const [joke, setJoke] = useState('');
  const [showReaction, setShowReaction] = useState(false);
  const [message, setMessage] = useState('');
  const [jokeHistory, setJokeHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getJoke = async () => {
    try {
      const response = await fetch ('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
      setShowReaction(true);
      setMessage('');
      setJokeHistory((prevHistory) => [...prevHistory, data.value]);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const relaxChuck = () => {
    if (joke === '') {
      setMessage('Chuck Norris is always relaxed.');
    } else {
      setShowReaction(false);
      setJoke('');
      setMessage(`Chuck Norris was always relaxed, even if it didn't look like it to you.`);
    }
    setShowReaction(false);
    setJoke('');
  }

  const deleteJoke = (index) => { 
    setJokeHistory((prevHistory) => prevHistory.filter((joke, i) => i !== index));
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <main>
      <h1 className='main-header'>Chuck Norris Jokes</h1>
      <div className='content-container'>
        <img 
          src={showReaction ? '/assets/unfriendly_chuck.jpg' : '/assets/friendly_chuck.jpg'}
          className={showReaction ? 'unfriendly-chuck' : 'friendly-chuck' }
          alt='Chuck Norris' 
        />
        <div className='button-container'>
          <button onClick={getJoke} className='joke-button'>Get a Joke</button>
          <button onClick={relaxChuck} className='relax-button'>Relax Chuck</button>
          <button onClick={openModal} className='history-button'>Joke History</button>
        </div>
      </div>
      {joke && <p className='joke'>{joke}</p>}
      {showReaction}

      {message && <p className='message'>{message}</p>}
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content'>
            <h2>Joke History</h2>
            <JokeHistory jokeHistory={jokeHistory} deleteJoke={deleteJoke} />
            <button onClick={openModal} className='close-button'>Close</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App;