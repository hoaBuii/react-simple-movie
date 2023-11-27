export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
export const tmdbEndPointSearch = "https:api.themoviedb.org/3/search/movie";
export const apiKey = "a0d7e56f44a096c3b74ae90a43529eeb";

export const tmdbAPI = {
  getMovieList: (type, page = 1) => {
    return `${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${page}`;
  },
  getMovieMeta: (movieId, type) => {
    return `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`;
  },
  getMovieSearch: (query, page = 1) => {
    return `${tmdbEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`;
  },
  imageOriginal: (url) => {
    return `https://image.tmdb.org/t/p/original${url}`;
  },
  image500: (url) => {
    return `https://image.tmdb.org/t/p/w500/${url}`;
  },
};
