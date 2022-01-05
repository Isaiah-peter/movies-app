import React, { useState, useEffect } from "react";
import play from "../img/play-button.png";
import moviedb from "../api/moviesapi";
import Paginate from "react-paginate";

export const MoviesDetail = (props) => {
  const [detail, setDetail] = useState({});
  const [cast, setCast] = useState({});
  const [currentCast, setCurrentCast] = useState(0);
  const [castImage, setCastImage] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [crewImage, setCrewImage] = useState([]);
  const [pageCrewNumber, setPageCrewNumber] = useState(0);
  const [videotoplay, setVideotoplay] = useState(false);

  let userPerpage = 4;
  if (window.innerWidth <= 900) {
    userPerpage = 3;
  }
  const visitedPage = pageNumber * userPerpage;
  const crewVisitedPage = pageCrewNumber * userPerpage;

  const getDetail = async () => {
    const Id = props.match.params.id;
    const response = await moviedb.get(
      `/movie/${Id}?&append_to_response=videos`
    );
    setDetail(response.data);
  };

  const getCast = async () => {
    const Id = props.match.params.id;
    const response = await moviedb.get(`/movie/${Id}/credits`);
    setCast(response.data.cast[currentCast]);
    setCastImage(response.data.cast);
    setCrewImage(response.data.crew);
  };

  useEffect(() => {
    getDetail();
    setCurrentCast(currentCast + 1);
    if (currentCast === castImage.length) {
      setCurrentCast(0);
    }
    getCast();
  }, []);

  const getGenres = () => {
    let result = [];
    if (detail.genres) {
      detail.genres.map((item) => {
        result.push(item.name);
      });
    } else {
      result.push("genres");
    }
    return result.join(",");
  };

  const getCastdata = () => {
    if (cast) {
      return (
        <div key={cast.original_name} className="feature__info">
          <div>
            <div className="feature__info-header">{cast.character}</div>
          </div>
          <div>
            <div className="feature__info-header">{cast.original_name}</div>
          </div>
        </div>
      );
    }
  };

  const renderCastImage = castImage
    .slice(visitedPage, visitedPage + userPerpage)
    .map((image) => {
      if (image) {
        return (
          <div
            key={image.cast_id === undefined ? image.character : image.cast_id}
            className="play-cast__box"
          >
            <div
              style={{
                backgroundImage: `linear-gradient(to left bottom, rgba(121, 32, 72, 0.502), rgba(63, 141, 198, .5)),url(https://image.tmdb.org/t/p/w500/${image.profile_path})`,
              }}
              className="play-cast__image"
            ></div>
            <div className="play-cast__detail">
              <h2 className="play-cast__nameR">{image.name}</h2>
              <h4 className="play-cast__name">{image.character}</h4>
            </div>
          </div>
        );
      }
    });

  const renderCrew = crewImage
    .slice(crewVisitedPage, crewVisitedPage + userPerpage)
    .map((image) => {
      return (
        <div key={Math.floor(Math.random())} className="image-cast__box">
          <div
            style={{
              backgroundImage: `linear-gradient(to left bottom, rgba(121, 32, 72, 0.502), rgba(63, 141, 198, .5)),url(https://image.tmdb.org/t/p/w500/${image.profile_path})`,
            }}
            className="play-cast__image"
          ></div>
        </div>
      );
    });

  const pageCount = Math.ceil(castImage.length / userPerpage);
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCrewCount = Math.ceil(crewImage.length / userPerpage);
  const pageCrewChange = ({ selected }) => {
    setPageCrewNumber(selected);
  };

  if (videotoplay === true) {
    console.log(
      `https://www.youtube.com/embed/${detail.videos.results[0].key}`
    );
  }

  return (
    <div className="p5">
      <div className="movie-info">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detail.poster_path})`,
          }}
          className="movie-info__image"
        ></div>
        <div className="movie-info__details">
          <div className="movie-info__header">
            <h1 className="movie-info__header-name">{detail.original_title}</h1>
            <h4 className="movie-info__header-name-detail">
              ⭐ {Math.floor((detail.popularity * 100) / 10000)}%
              <span className="mr-2 ml-2">|</span>
              {detail.release_date == null
                ? detail.first_air_date
                : detail.release_date}
              <span className="mr-2 ml-2">|</span>
              {getGenres()}
            </h4>
          </div>
          <div className="movie-info__detail">{detail.overview}</div>
          <div className="feature">
            <div className="feature__header">Feature Cast</div>
            {getCastdata()}
          </div>
          <div className="play-btn" onClick={() => setVideotoplay(true)}>
            <img src={play} alt="play" className="play-btn-icon" />
            <div className="thriller">Play Trailer</div>

            <iframe
              className={
                videotoplay ? "play-videoframe-show" : "play-videoframe"
              }
              src={
                videotoplay
                  ? `https://www.youtube.com/embed/${
                      detail.length > 0 && detail.videos.results[0].key
                    }`
                  : ""
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="p5">
        <h2 className="play-cast__header">Cast</h2>
        <div className="play-cast">{renderCastImage}</div>
        <Paginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName={"paginationBtn"}
          previousLinkClassname={"previousBtn"}
          nextLinkClassname={"nextBtn"}
          activeClassName={"activebtn"}
        />
      </div>

      <div className="border-buttom"></div>

      <div className="p5">
        <h2 className="play-cast__header">Crew</h2>
        <div className="image-cast">{renderCrew}</div>
        <Paginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCrewCount}
          onPageChange={pageCrewChange}
          containerClassName={"paginationBtn"}
          previousLinkClassname={"previousBtn"}
          nextLinkClassname={"nextBtn"}
          activeClassName={"activebtn"}
        />
      </div>
    </div>
  );
};
