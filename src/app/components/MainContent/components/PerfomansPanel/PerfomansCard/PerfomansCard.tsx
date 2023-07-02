"use client";
import { useRouter } from "next/navigation";
import styles from "./PerfomansCard.module.scss";
import Image from "next/image";
import EmptyImage from "@/app/components/EmptyImage/EmptyImage";

type PerfomansCardProps = {
  rate?: number;
  posterPath: string;
  title: string;
  date?: string;
  id: number;
  personList?: boolean;
  noOptions?: boolean;
};

const colorRate = (rate: number) => {
  if (rate === 0) return "grey";
  if (rate > 7) return "green";
  if (rate < 7 && rate > 5) return "grey";
  if (rate < 5) return "red";
  return "grey";
};

const PerfomansCard = ({
  rate,
  posterPath,
  title,
  id,
  date,
  personList,
  noOptions,
}: PerfomansCardProps) => {
  const router = useRouter();
  return (
    <div
      className={styles.card}
      onClick={() => !personList && router.push(`/movie-poster/${id}`)}
    >
      <div
        className={styles.card_wrapper}
        style={{ width: personList ? "250px" : "300px" }}
      >
        {!personList && (
          <div className={styles.card_top_info}>
            <div
              className={styles.card_rate}
              style={{ backgroundColor: colorRate(rate || 0) }}
            >
              {rate ? rate : "NR"}
            </div>

            {!noOptions && <div className={styles.card_option}>...</div>}
          </div>
        )}

        <div className={styles.card_image_wrapper}>
          {!!posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${posterPath}`}
              alt={"poster"}
              width={personList ? 250 : 320}
              height={personList ? 350 : 400}
            />
          ) : (
            <EmptyImage />
          )}
        </div>
      </div>
      <div className={styles.card_content}>
        <h4>{title}</h4>
        {date && <span>{date}</span>}
      </div>
    </div>
  );
};

export default PerfomansCard;
