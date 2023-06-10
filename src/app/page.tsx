import MainPage from "./components/MainPage/MainPage";
import MoviesListService from "./service/moviesService";

export default async function Home() {
  const moviesList = await MoviesListService.getNowWatchingMovies();
  const popularMoviesList = await MoviesListService.getPopularMovies();

  return (
    <MainPage moviesList={moviesList} popularMoviesList={popularMoviesList} />
  );
}
