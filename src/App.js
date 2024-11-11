import { useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState('');
  const [showReaction, setShowReaction] = useState(false);
  const [message, setMessage] = useState('');

  const getJoke = async () => {
    try {
      const response = await fetch ('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
      setShowReaction(true);
      setMessage('');
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

  return (
    <main>
      <h1 className='main-header'>Chuck Norris Jokes</h1>
      <img 
        src={showReaction ? '/assets/unfriendly_chuck.jpg' : '/assets/friendly_chuck.jpg'}
        className='friendly-chuck' 
        alt='Chuck Norris' 
      />
      <button onClick={getJoke} className='joke-button'>Get a Joke</button>
      {joke && <p className='joke'>{joke}</p>}
      {showReaction && <p className='reaction'>Chuck Norris is not amused.</p>}

      <button onClick={relaxChuck} className='relax-button'>Relax Chuck</button>
      {message && <p className='message'>{message}</p>}
    </main>
  )
}

export default App;