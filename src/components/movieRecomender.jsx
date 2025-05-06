import React, { useState, useEffect } from 'react';
import { MdSearch } from "react-icons/md";
import moviedb from "../api/moviesapi";

export default function ChatRecommender() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [openOutputBar, setOpenOutputBar] = useState(false)

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const res = await moviedb.get(`/genre/movie/list`);
    const data = await res.data;
    setGenres(data.genres);
  };

  // No import needed — compromise is available globally as `nlp`
const extractGenresFromInput = (text) => {
  const doc = window.nlp(text); // ← use global `nlp`
  const tokens = doc.nouns().out('array').map(t => t.toLowerCase());

  const genreNames = genres.map(g => g.name.toLowerCase());
  const found = tokens.filter(token => genreNames.includes(token));
  return genres.filter(g => found.includes(g.name.toLowerCase()));
};


  const handleSend = async () => {
    setOpenOutputBar(true)
    setMessages([...messages, { sender: 'user', text: input }]);
    const matchedGenres = extractGenresFromInput(input);
  
    if (matchedGenres.length > 0) {
      const genreIds = matchedGenres.map(g => g.id).join(',');
      const res = await moviedb.get(`/discover/movie?&with_genres=${genreIds}`);
      const data = await res.data;
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
    <div>
      <div class = {openOutputBar ? "recomender-window .no-scrollbar" : ""}>
        {messages.map((msg, i) => <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>)}
        {recommendations.map((movie, i) => (
          <a id={i}
          href={
            window.location.pathname === "/" ||
            window.location.pathname === "/actors"
              ? `/moviedetail/${movie.id}`
              : `/tvshowdetail/${movie.id}`
          }
          className="navbar__search-output-link"
        >
          🎬 {movie.title || movie.name}
        </a>
        ))}
      </div>
      <div class="recomender-form">
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your movie preference..." class="recomender-input" />
      <button class="recomender-button" onClick={handleSend}><MdSearch class="text-white" /></button>
      </div>
    </div>
  );
}
