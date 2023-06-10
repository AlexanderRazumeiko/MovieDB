import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";

const SSH_KEY = "726bb0eeee512069630aba2c9a0100a9";

axios.defaults.baseURL = API_URL;

export type MoviesListType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponce = {
  results: MoviesListType[];
};

const MoviesListService = {
  async getLatestTrailers() {
    const { data } = await axios.get<any>(
      `/movie/now_playing?api_key=${SSH_KEY}`
    );
    return data.results;
  },
};

export default MoviesListService;
