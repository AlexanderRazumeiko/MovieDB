import Link from "next/link";
import EmptyImage from "../EmptyImage/EmptyImage";
import styles from "./SearchResultCard.module.scss";
import Image from "next/image";

type SearchResultCardType = {
  posterPath: string;
  title: string;
  date: string;
  overview: string;
  id: number;
};

const SearchResultCard = ({
  posterPath,
  date,
  title,
  overview,
  id,
}: SearchResultCardType) => {
  return (
    <Link href={`/movie-poster/${id}`}>
      <div className={styles.card_box}>
        <div className={styles.card_image_wrapper}>
          {posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${posterPath}`}
              alt={"poster-image"}
              width={180}
              height={260}
            />
          ) : (
            <EmptyImage />
          )}
        </div>

        <div className={styles.card_info}>
          <div className={styles.card_title}>
            <h4>{title}</h4>
            <span>{date}</span>
          </div>
          {overview && <p>{overview.slice(0, 258) + "..."}</p>}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
