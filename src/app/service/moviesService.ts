import axios from "axios";

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

export interface SearchMovieResponce extends MoviesResponce {
  total_pages: number;
  total_results: number;
  results: MoviesListType[];
}

type PersonsListResponce = {
  cast: PesonsListType[];
};

export type SortType =
  | "popularity.asc"
  | "popularity.desc"
  | "vote.asc"
  | "vote.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc";

export type MovieCategoryType =
  | "now_playing"
  | "popular"
  | "upcoming"
  | "top_rated";

export type FilterDataType = {
  sortBy: SortType;
  genres: string[];
  vote: number;
  page: number;
};

const MoviesListService = {
  async getMoviesList(category: MovieCategoryType) {
    const { data } = await axios.get<MoviesResponce>(
      `/movie/${category}?api_key=${SSH_KEY}`
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
  async getFilteredMovies(filterData: FilterDataType) {
    const { genres, vote, sortBy, page } = filterData;
    const genresString =
      genres.length > 1 ? genres.join("%2C").toLowerCase() : genres;
    const { data } = !genres.length
      ? await axios.get<MoviesResponce>(
          `discover/movie?include_adult=false&include_video=false&language=en-US&api_key=${SSH_KEY}&page=${page}&sort_by=${sortBy}&vote_average.gte=${vote}`
        )
      : await axios.get<MoviesResponce>(
          `discover/movie?include_adult=false&include_video=false&language=en-US&api_key=${SSH_KEY}&page=${page}&sort_by=${sortBy}&vote_average.gte=${vote}&with_genres=${genresString}`
        );
    return data.results;
  },
  async getSearcMovies(query: string, page = "1") {
    const { data } = await axios.get<SearchMovieResponce>(
      `/search/movie?query=${query}&api_key=${SSH_KEY}&page=${page}`
    );

    return data;
  },
};

export default MoviesListService;
