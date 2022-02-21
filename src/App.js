import React, { useEffect, useState } from "react";
import "swiper/swiper.min.css";
import { MoviesApp } from "./components/Moveies";
import { Navbar } from "./components/Navbar";
import { MoviesDetail } from "./components/MoviesDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moviedb from "./api/moviesapi";
import { Actors } from "./components/actors";
import { TvShow } from "./components/tvshow";
import { TvShowDetail } from "./components/tvshowDetail";
import tmdbApi, { movieType, tvType, category } from "./api/routes";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvshow, setPopularTvShow] = useState([]);
  const [genre, setGenre] = useState([]);
  const [movieDetailData, setMovieDetailData] = useState([]);
  const [type, setType] = useState("movie");

  useEffect(() => {
    const movieDataB = async () => {
      const params = { pages: 1 };
      const response = await tmdbApi.getMoviesList(movieType.popular, params);
      setPopularMovies(response.results.slice(0, 20));
      console.log("movies", response);
    };
    const movieDataGenre = async () => {
      const response = await tmdbApi.getGenreList(type);
      setGenre(response.genres);
      console.log("genre", response);
    };

    const tvShowDataB = async () => {
      const params = { pages: 1 };
      const res = await tmdbApi.getTvList(tvType.popular, params);
      setPopularTvShow(res.results.slice(0, 20));
      console.log("tv", res);
    };

    const getType = () => {
      let type = "movies";
      if (
        window.location.pathname === "/tvshow" ||
        window.location.pathname === "/tvshowdetail/:id"
      ) {
        type = "tv";
      }
      setType(type);
    };

    getType();
    movieDataB();
    movieDataGenre();
    tvShowDataB();
  }, []);

  console.log(type);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <MoviesApp movies={popularMovies} genres={genre} />
        </Route>
        <Route
          exact
          path="/moviedetail/:id"
          component={MoviesDetail}
          genres={genre}
        />
        <Route exact path="/actors" component={Actors} />
        <Route exact path="/tvshow">
          <TvShow tv={popularTvshow} genres={genre} />
        </Route>
        <Route
          exact
          path="/tvshowdetail/:id"
          component={TvShowDetail}
          genres={genre}
        />
      </Switch>
    </Router>
  );
}

export default App;
