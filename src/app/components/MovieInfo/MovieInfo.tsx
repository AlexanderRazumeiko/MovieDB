import PerfomansPanel from "../MainContent/components/PerfomansPanel/PerfomansPanel";
import styles from "./MovieInfo.module.scss";
import MoviePoster from "./MoviePoster/MoviePoster";
import { MovieInfoType, PesonsListType } from "@/app/service/moviesService";

type MovieInfoProps = {
  movieInfo: MovieInfoType;
  personsList: PesonsListType[];
};

const MovieInfo = ({ movieInfo, personsList }: MovieInfoProps) => {
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    backdrop_path,
    genres,
    runtime,
    budget,
    status,
    revenue,
    original_language,
  } = movieInfo;

  return (
    <>
      <div className={styles.main}>
        <MoviePoster
          posterPath={poster_path}
          title={title}
          releaseDate={release_date}
          rate={vote_average}
          overview={overview}
          backdropPath={backdrop_path}
          genres={genres}
          runtime={runtime}
        />
        <div className={styles.sub_info}>
          {!!personsList.length && (
            <PerfomansPanel title={"Starring"} personsList={personsList} />
          )}
          <div
            className={styles.info_facts}
            style={{ marginTop: !!personsList.length ? "160px" : "50px" }}
          >
            <div className={styles.info_block}>
              <h3>Original title</h3>
              <span>{title}</span>
            </div>
            <div className={styles.info_block}>
              <h3>Status</h3>
              <span>{status}</span>
            </div>
            <div className={styles.info_block}>
              <h3>Source language</h3>
              <span>{original_language}</span>
            </div>
            <div className={styles.info_block}>
              <h3>Budget</h3>
              <span>{budget ? `$${budget}` : "-"}</span>
            </div>
            <div className={styles.info_block}>
              <h3>Fees</h3>
              <span>{revenue ? `$${revenue}` : "-"} </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
