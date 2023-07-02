import MainPage from "./components/MainPage/MainPage";
import MoviesListService from "./service/moviesService";

export default async function Home() {
  const moviesList = await MoviesListService.getMoviesList("now_playing");
  const popularMoviesList = await MoviesListService.getMoviesList("popular");

  return (
    <MainPage moviesList={moviesList} popularMoviesList={popularMoviesList} />
  );
}
