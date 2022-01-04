import React, { useState, useEffect } from "react";
import { MdSearch, MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import moviedb from "../api/moviesapi";
import logo from "../img/film.png";
import user from "../img/user.jpg";

export const Navbar = () => {
  const [searchInput, setSearchIput] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/actors"
    ) {
      if (searchInput && !result.length) {
        searchMovies();
      } else {
        const timeOutId = setTimeout(() => {
          if (searchInput) {
            searchMovies();
          }
        }, 1000);

        return () => {
          clearTimeout(timeOutId);
        };
      }
    } else if (window.location.pathname === "/tvshow") {
      if (searchInput && !result.length) {
        searchTvshow();
      } else {
        const timeOutId = setTimeout(() => {
          if (searchInput) {
            searchTvshow();
          }
        }, 1000);

        return () => {
          clearTimeout(timeOutId);
        };
      }
    }
  }, [searchInput]);

  const searchMovies = async () => {
    const { data } = await moviedb.get("/search/movie", {
      params: {
        query: searchInput,
      },
    });

    setResult(data.results);
  };

  const searchTvshow = async () => {
    const { data } = await moviedb.get("/search/tv", {
      params: {
        query: searchInput,
      },
    });

    setResult(data.results);
  };

  const hide = () => {
    const ul = document.getElementById("side-bar");

    ul.classList.remove("show");
  };
  const show = () => {
    const ul = document.getElementById("side-bar");
    const close = document.getElementById("close");

    ul.classList.add("show");
    close.classList.add("cancel");
  };

  const searchBar = (e) => {
    setSearchIput(e.target.value);
  };

  const renderList = result.slice(0, 12).map((res) => {
    return (
      <li className="navbar__search-output-list">
        <a
          href={
            window.location.pathname === "/" ||
            window.location.pathname === "/actors"
              ? `/moviedetail/${res.id}`
              : `/tvshowdetail/${res.id}`
          }
          className="navbar__search-output-link"
        >
          {res.title || res.name}
        </a>
      </li>
    );
  });

  return (
    <div className="navbar">
      <div className="navbar__app-detail">
        <div className="app-name-icon">
          <img src={logo} className="navbar-logo" alt="logo" />
          <h1 className="app-name">
            <a style={{ textDecoration: "none", color: "#fff" }} href="/">
              MoviesApp
            </a>
          </h1>
        </div>

        <div id="side-bar" className="navbar__search-list">
          <MdOutlineClose onClick={hide} id="close" className="navbar-logo" />
          <div className="navbar-list">
            <nav>
              <ul className="navbar-items">
                <li className="navbar-item">
                  <a onClick={hide} href="/">
                    Movies
                  </a>
                </li>
                <li className="navbar-item">
                  <a onClick={hide} href="/tvshow">
                    TV Shows
                  </a>
                </li>
                <li className="navbar-item">
                  <a onClick={hide} href="/actors">
                    Actors
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="navbar__search">
            {window.location.pathname === "/tvshow" ||
            window.location.pathname === "/" ? (
              <form onSubmit={hide} className="navbar__form">
                <MdSearch className="search-icon" />
                <input
                  className="navbar__input"
                  onChange={searchBar}
                  value={searchInput}
                  type="text"
                  placeholder="search..."
                />
              </form>
            ) : null}
            <img className="user" src={user} />
          </div>
          {searchInput !== "" ? (
            <div className="navbar__search-output">
              <ul>{renderList}</ul>
            </div>
          ) : null}
        </div>
        <MdOutlineMenu onClick={show} className="navbar-logo menu" />
      </div>
    </div>
  );
};
