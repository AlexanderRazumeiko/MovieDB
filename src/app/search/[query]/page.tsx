"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header/Header";
import styles from "./SearchPage.module.scss";
import SearchResultCard from "@/app/components/SearchResultCard/SearchResultCard";
import MoviesListService, {
  MoviesListType,
  SearchMovieResponce,
} from "@/app/service/moviesService";
import Footer from "@/app/components/Footer/Footer";
import PageList from "@/app/components/PagesList/PagesList";

const SearchPage = ({ params }: { params: { query: string } }) => {
  const [searhResponse, setSearchResponse] = useState<MoviesListType[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const getSearchResponce = async () => {
    const response = await MoviesListService.getSearcMovies(params.query);
    if (response) {
      const { total_pages, results, total_results } = response;
      setSearchResponse(results);
      setTotalResults(total_results);
      setTotalPages(total_pages);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getSearchResponce();
  }, [params]);

  return (
    <div className="layout">
      <Header />
      <div className="main">
        <div className={styles.search_results_container}>
          {`Search Results: ${totalResults}`}
        </div>
        <div className={styles.search_card_container}>
          {searhResponse.map((item) => {
            const { poster_path, id, title, release_date, overview } = item;
            return (
              <React.Fragment key={id}>
                <SearchResultCard
                  posterPath={poster_path}
                  date={release_date}
                  overview={overview}
                  title={title}
                  id={id}
                />
              </React.Fragment>
            );
          })}
          <PageList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
