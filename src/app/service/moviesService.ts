import axios from "axios";
import { revalidatePath } from "next/cache";
import next from "next/types";

const API_URL = "https://api.themoviedb.org/3";

const SSH_KEY = "726bb0eeee512069630aba2c9a0100a9";

axios.defaults.baseURL = API_URL;

export type GenresType = {
  name: string;
  id: number;
};

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

export type PesonsListType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export interface MovieInfoType extends MoviesListType {
  genres: GenresType[];
  backdrop_path: string;
  runtime: string;
  status: string;
  revenue: number;
  budget: number;
}

type MoviesResponce = {
  results: MoviesListType[];
};

type PersonsListResponce = {
  cast: PesonsListType[];
};

const MoviesListService = {
  async getNowWatchingMovies() {
    const { data } = await axios.get<MoviesResponce>(
      `/movie/now_playing?api_key=${SSH_KEY}`
    );
    return data.results;
  },
  async getPopularMovies() {
    const { data } = await axios.get<MoviesResponce>(
      `/movie/popular?api_key=${SSH_KEY}`
    );
    return data.results;
  },
  async getMovieInfo(id: string) {
    const { data } = await axios.get<MovieInfoType>(
      `/movie/${id}?api_key=${SSH_KEY}`
    );
    return data;
  },

  async getPersons(id: string) {
    const { data } = await axios.get<PersonsListResponce>(
      `/movie/${id}/credits?api_key=${SSH_KEY}`
    );
    return data.cast;
  },
};

export default MoviesListService;
