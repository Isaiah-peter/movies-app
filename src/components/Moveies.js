import React, { useEffect } from "react";

export const MoviesApp = ({ movies, genres, type }) => {
  console.log("from movies", genres.genres);
  const getGenres = (ids) => {
    let result = [];
    if (ids === "") {
      return <div>loading</div>;
    }
    if (genres.length > 0) {
      genres.forEach((item) => {
        console.log("inside for loop", item);
        if (ids.includes(item.id)) {
          result.push(item.name);
        }
      });
    }

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
    </div>
  );
};
