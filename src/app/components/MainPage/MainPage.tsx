import { MoviesListType } from "@/app/service/moviesService";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";
import styles from "./MainPage.module.scss";

type MainPageProps = {
  moviesList: MoviesListType[];
  popularMoviesList: MoviesListType[];
};

const MainPage = ({ moviesList, popularMoviesList }: MainPageProps) => {
  return (
    <div className={styles.main_page}>
      <Header />
      <MainContent
        moviesList={moviesList}
        popularMoviesList={popularMoviesList}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
