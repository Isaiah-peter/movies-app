import axiosClient from "./moviesapi";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  on_the_air: "on_the_air",
  popular: "popular",
  top_rated: "top_rated",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getGenreList: (cate) => {
    const url = "genre/" + cate + "/list";
    return axiosClient.get(url, { params: {} });
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  getVideos: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },

  detail: (cate, id, param) => {
    const url = category[cate] + "/" + id;
    return axiosClient(url, param);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient(url, { params: {} });
  },
};

export default tmdbApi;
