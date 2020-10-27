let API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

export const MOVIE_LIST_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=%s&page=1&include_adult=true`;
export const MOVIES_PAGE = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=%s1&page=%s2&include_adult=false`;
export const TRAILER_URL = `https://api.themoviedb.org/3/movie/%s/videos?api_key=${API_KEY}`;