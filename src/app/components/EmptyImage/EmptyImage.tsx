import styles from "./EmptyImage.module.scss";
import { AiFillFileImage } from "react-icons/ai";

const EmptyImage = () => {
  return (
    <div className={styles.empty_image}>
      <AiFillFileImage size={100} />
    </div>
  );
};

export default EmptyImage;
