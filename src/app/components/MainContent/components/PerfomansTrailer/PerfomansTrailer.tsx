import styles from "./PerfomansTrailer.module.scss";
import PerfomansVideo from "./PerfomansVideo/PerfomansVideo";

const PerfomansTrailer = () => {
  return (
    <div className={styles.trailer_box}>
      <div className={styles.trailer_tittle}>
        <h2>Last trailers</h2>
      </div>
      <div className={styles.trailer_content}>
        <PerfomansVideo />
      </div>
    </div>
  );
};

export default PerfomansTrailer;
