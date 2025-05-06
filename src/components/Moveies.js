/*
get all movies
*/

import React from "react";
import ChatRecommender from "./movieRecomender"

export const MoviesApp = ({ movies, genres }) => {
  const getGenres = (ids) => {
    let result = [];
    if (ids === "") {
      return <div>loading</div>;
    }
    genres.forEach((item) => {
      if (ids.includes(item.id)) {
        result.push(item.name);
      }
    });

    return result.join(",");
  };

  const renderMovise = movies.map((movie) => {
    return (
      <div key={movie.id} className="card__content">
        <a href={`/moviedetail/${movie.id}`}>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
            className="card__image"
          ></div>
        </a>
        <div className="card__discription">
          <a href={`/moviedetail/${movie.id}`} className="card__link">
            {movie.original_title}
          </a>
          <div className="data mt-1">
            <span>⭐</span>
            <span className="mr-2">
              {Math.floor((movie.popularity * 100) / 10000)}%
            </span>
            <span>|</span>
            <span className="ml-2">{movie.release_date}</span>
          </div>
          <div className="data__discription">{getGenres(movie.genre_ids)}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="popular-movies">
        <h2>Popular Movies</h2>
      </div>
      <div className="card__container">{renderMovise}</div>

      <div class="chat-bot">
        <ChatRecommender />
      </div>
    </div>
  );
};
