"use client";
import { useRouter } from "next/navigation";
import styles from "./PerfomansCard.module.scss";
import Image from "next/image";

type PerfomansCardProps = {
  rate?: number;
  posterPath: string;
  title: string;
  date?: string;
  id: number;
  width?: number;
  height?: number;
};

const PerfomansCard = ({
  rate,
  posterPath,
  title,
  id,
  date,
  width,
  height,
}: PerfomansCardProps) => {
  const colorRate = (rate: number) => {
    if (rate > 7) return "green";
    if (rate < 7 && rate > 5) return "grey";
    if (rate < 5) return "red";
    return "grey";
  };
  const router = useRouter();
  return (
    <div
      className={styles.card}
      onClick={() => !width && router.push(`/movies/${id}`)}
    >
      <div className={styles.card_wrapper}>
        <div className={styles.card_top_info}>
          {rate && (
            <div
              className={styles.card_rate}
              style={{ backgroundColor: colorRate(rate) }}
            >
              {rate}
            </div>
          )}
          {!width && <div className={styles.card_option}>...</div>}
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={"poster"}
          width={width || 320}
          height={height || 400}
        />
      </div>
      <div className={styles.card_content}>
        <h4>{title}</h4>
        {date && <span>{date}</span>}
      </div>
    </div>
  );
};

export default PerfomansCard;
