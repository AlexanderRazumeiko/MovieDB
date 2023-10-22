"use client";
import { useEffect, useState } from "react";
import FilterBox from "@/app/components/FilterBox/FilterBox";
import styles from "./MoviesPage.module.scss";
import Header from "@/app/components/Header/Header";
import PerfomansCard from "@/app/components/MainContent/components/PerfomansPanel/PerfomansCard/PerfomansCard";
import MoviesListService, {
  FilterDataType,
  MovieCategoryType,
  MoviesListType,
} from "@/app/service/moviesService";
import React from "react";
import Footer from "@/app/components/Footer/Footer";
import { CircularProgress } from "@mui/material";

const MovieFilterPage = ({ params }: { params: { id: MovieCategoryType } }) => {
  const [moviesList, setMoviesList] = useState<MoviesListType[]>([]);
  const [filterData, setFilterData] = useState<FilterDataType>({
    sortBy: "popularity.desc",
    vote: 5,
    page: 1,
    genres: [],
  });
  const [noMoreFilms, setNoMoreFilms] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getTitle = (title: string) => {
    switch (title) {
      case "now_playing":
        return "Now Playing";
      case "popular":
        return "Popular";
      case "top_rated":
        return "Top Rated";
      case "upcoming":
        return "Upcoming";
      default:
        return "Popular";
    }
  };

  const getMoviesList = async () => {
    const movies = await MoviesListService.getMoviesList(params.id);
    if (movies) {
      setMoviesList(movies);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const getMovie = (data: MoviesListType[]) => {
    setMoviesList(data);
    setLoading(false);
  };

  const getFilteredMovies = async (data: FilterDataType) => {
    setLoading(true);
    MoviesListService.getFilteredMovies(data).then(getMovie);
    setFilterData(data);
  };

  useEffect(() => {
    getMoviesList();
  }, []);

  const onLoadedMore = () => {
    setLoading(true);
    MoviesListService.getFilteredMovies({
      ...filterData,
      page: filterData.page + 1,
    }).then((data: MoviesListType[]) => {
      if (!data.length) setNoMoreFilms(true);
      const newData = [...moviesList, ...data];
      setMoviesList(newData);
      setLoading(false);
    });
    setFilterData({ ...filterData, page: filterData.page + 1 });
  };

  return (
    <div className="layout">
      <Header />
      <div className="main">
        <FilterBox
          title={getTitle(params.id)}
          getFilteredMovies={getFilteredMovies}
        />

        <div className="movie_list_container">
          {moviesList.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <PerfomansCard
                  id={item.id}
                  title={item.title}
                  posterPath={item.poster_path}
                  date={item.release_date}
                  rate={item.vote_average}
                  noOptions
                />
              </React.Fragment>
            );
          })}
          {loading && !noMoreFilms && (
            <div className={styles.loading_wrapper}>
              <CircularProgress size={50} />
            </div>
          )}

          {!loading && (
            <div className={styles.button_wrapper}>
              <button
                className={styles.loaded_more_button}
                onClick={onLoadedMore}
              >
                Loaded more
              </button>
            </div>
          )}
        </div>
      </div>
      {!loading && <Footer />}
    </div>
  );
};

export default MovieFilterPage;
