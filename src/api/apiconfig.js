const apiConfig = {
  baseURL: "https://api.themoviedb.org/3/",
  api_key: "01ce0249e6d58cea5cd631a0b47bb6ab",
  originalImage: (imgPath) => "https://image.tmdb.org/t/p/original/" + imgPath,
  w500Image: (imgPath) => "https://image.tmdb.org/t/p/w500/" + imgPath,
};

export default apiConfig;
