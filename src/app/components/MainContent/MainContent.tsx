import MoviesListService, { MoviesListType } from "@/app/service/moviesService";
import styles from "./MainContent.module.scss";
import PerfomansPanel from "./components/PerfomansPanel/PerfomansPanel";
import PerfomansTrailer from "./components/PerfomansTrailer/PerfomansTrailer";
import VisitedSearchPanel from "./components/VisitedPanel/VisitedSearchPanel";

type MainContentProps = {
  moviesList: MoviesListType[];
  popularMoviesList: MoviesListType[];
};

const MainContent = ({ moviesList, popularMoviesList }: MainContentProps) => {
  return (
    <main className={styles.main}>
      <VisitedSearchPanel />
      <PerfomansPanel title='On Trend' moviesList={moviesList} />
      <PerfomansTrailer />
      <PerfomansPanel title='Popular' moviesList={popularMoviesList} />
    </main>
  );
};

export default MainContent;
