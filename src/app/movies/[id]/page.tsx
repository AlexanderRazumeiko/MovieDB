import Header from "@/app/components/Header/Header";
import MovieInfo from "@/app/components/MovieInfo/MovieInfo";
import MoviesListService from "@/app/service/moviesService";

const MovieInfoPage = async ({ params }: { params: { id: string } }) => {
  const movieInfo = await MoviesListService.getMovieInfo(params.id);
  const personsList = await MoviesListService.getPersons(params.id);

  return (
    <div className='layout'>
      <Header />
      <MovieInfo movieInfo={movieInfo} personsList={personsList} />
    </div>
  );
};

export default MovieInfoPage;
