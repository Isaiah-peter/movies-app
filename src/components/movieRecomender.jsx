import React, { useState, useEffect } from 'react';


const TMDB_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export default function MovieRecommender() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    setGenres(data.genres);
  };

  const extractGenresFromInput = (text) => {
    const genreNames = genres.map(g => g.name.toLowerCase());
    const foundGenres = genreNames.filter(name => text.toLowerCase().includes(name));
    return genres.filter(g => foundGenres.includes(g.name.toLowerCase()));
  };

  const getRecommendations = async (genreId) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
    const data = await res.json();
    setRecommendations(data.results.slice(0, 5)); // limit to 5 recommendations
  };

  const handleSend = async () => {
    setEmpty(true);
    setMessages([...messages, { sender: 'user', text: input }]);
    const matchedGenres = extractGenresFromInput(input);
  
    if (matchedGenres.length > 0) {
      const genreIds = matchedGenres.map(g => g.id).join(',');
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreIds}`);
      const data = await res.json();
      setRecommendations(data.results.slice(0, 5));
      
      const genreNames = matchedGenres.map(g => g.name).join(', ');
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `Here are some ${genreNames} movies you might like:`
      }]);
    } else {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `Sorry, I couldn't detect any known genres. Try mentioning "comedy", "horror", etc.`
      }]);
    }
  
    setInput('');
  };
  

  return (
    <div className="recomender-container">
      <div className={empty ? "recomender-chat-container" : "hidden"}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`sender-chat ${m.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="recomender-form">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="recomender-input"
          placeholder="Describe what kind of movie you want..."
        />  
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded recomender-btn">Send</button>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-6 recomender-movies">
          <h2 className="text-lg font-semibold mb-2 mt-6 recomender-movies">Recommended Movies:</h2>
          <ul>
            {recommendations.map(movie => (
              <li key={movie.id} className="recomender-movies-list">🎬 {movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
