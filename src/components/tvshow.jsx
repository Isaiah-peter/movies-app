import React from "react";
import { Link } from "react-router-dom";

export const TvShow = ({ tv, genres, type }) => {
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

  const renderMovise = tv.map((movie) => {
    return (
      <div key={movie.id} className="card__content">
        <a href={`/tvshowdetail/${movie.id}`}>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
            className="card__image"
          ></div>
        </a>
        <div className="card__discription">
          <a href={`/tvshowdetail/${movie.id}`} className="card__link">
            {movie.original_name}
          </a>
          <div className="data mt-1">
            <span>⭐</span>
            <span className="mr-2">
              {Math.floor((movie.popularity * 100) / 10000)}%
            </span>
            <span>|</span>
            <span className="ml-2">{movie.first_air_date}</span>
          </div>
          <div className="data__discription">{getGenres(movie.genre_ids)}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="popular-movies">
        <h2>Popular Tv Show</h2>
      </div>
      <div className="card__container">{renderMovise}</div>
    </div>
  );
};
