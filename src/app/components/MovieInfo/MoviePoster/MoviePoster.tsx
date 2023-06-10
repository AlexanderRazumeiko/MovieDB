import styles from "./MoviePoster.module.scss";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { GenresType } from "@/app/service/moviesService";

type MoviePosterProps = {
  posterPath: string;
  title: string;
  releaseDate: string;
  rate: number;
  overview: String;
  backdropPath: string;
  genres: GenresType[];
  runtime: string;
};

const MoviePoster = ({
  posterPath,
  title,
  releaseDate,
  rate,
  overview,
  backdropPath,
  runtime,
  genres,
}: MoviePosterProps) => {
  const namesGenres = genres.map((item) => item.name);
  const yearDate = releaseDate.split("-")[0];
  const formatIime = (minutes: string) => {
    let h = Math.floor(Number(minutes) / 60);
    let m = Number(minutes) % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div
      className={styles.poster}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdropPath})`,
      }}
    >
      <div className={styles.poster_custom}>
        <div className={styles.poster_content}>
          <div className={styles.poster_image}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${posterPath}`}
              alt={"poster"}
              width={500}
              height={650}
            />
          </div>
          <div className={styles.poster_info}>
            <div className={styles.poster_title}>
              <h1>{title}</h1> <span>{`(${yearDate})`}</span>
            </div>
            <div className={styles.poster_subtitle}>
              <span>{releaseDate}</span>
              <span>{namesGenres.join(",").toLowerCase()}</span>
              <span>{formatIime(runtime)}</span>
            </div>
            <div className={styles.poster_actions}>
              <div className={styles.poster_rate}>{Math.round(rate)}</div>
              <h3>Rate</h3>
              <div className={styles.poster_action_round}>
                <AiFillHeart width={20} />
              </div>
            </div>
            <div className={styles.poster_description}>
              <h2>View</h2>
              <p style={{ width: "60%" }}>{overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
