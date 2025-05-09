import React, { useState, useEffect } from 'react';


const TMDB_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;

export default function MovieRecommender() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const aiReply = await extractGenresFromInput(input);
    let responseObj;

    try {
      responseObj = JSON.parse(aiReply);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I couldn't understand that." }]);
      return;
    }

    const genreNames = responseObj.genres || [];
    const titles = responseObj.movies || [];

    const genreList = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
      .then(res => res.json());

    const genreIds = genreList.genres
      .filter(g => genreNames.map(gn => gn.toLowerCase()).includes(g.name.toLowerCase()))
      .map(g => g.id);

    const movieResults = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreIds.join(',')}`)
      .then(res => res.json());

    setRecommendations(movieResults.results.slice(0, 5));

    setMessages(prev => [...prev, {
      sender: 'bot',
      text: `Based on your mood, I recommend these genres: ${genreNames.join(', ')}. Here are some suggestions:`
    }]);
  };

  const extractGenresFromInput = (text) => {
    const genreNames = genres.map(g => g.name.toLowerCase());
    const foundGenres = genreNames.filter(name => text.toLowerCase().includes(name));
    return genres.filter(g => foundGenres.includes(g.name.toLowerCase()));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="border p-4 rounded bg-white mb-4 h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${m.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>{m.text}</span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        className="w-full p-2 border rounded mb-4"
        placeholder="Describe what kind of movie you want..."
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Recommended Movies:</h2>
          <ul>
            {recommendations.map(movie => (
              <li key={movie.id} className="mb-2">🎬 {movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
