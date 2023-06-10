import styles from "./PerfomansVideo.module.scss";
import Image from "next/image";
import video from "./video.jpg";
import player from "./player-icon.png";

const PerfomansVideo = () => {
  return (
    <div className={styles.video_wrapper}>
      <Image src={video} alt={"mmm"} width={500} height={300} />
      <Image
        src={player}
        alt={"player"}
        width={80}
        height={80}
        style={{ position: "absolute", left: "40%" }}
      />
    </div>
  );
};

export default PerfomansVideo;
