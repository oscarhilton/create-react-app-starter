import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`flask.railway.internal:5000/api/similar/${word}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={word} 
            onChange={(e) => setWord(e.target.value)} 
            placeholder="Type a word" 
          />
          <button type="submit">Submit</button>
        </form>
        {result && (
          <div className="Result">
            <h3>Similar words for {word}:</h3>
            <pre>{result && result.similar.map(item => (
              <div>{item}</div>
            ))}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
