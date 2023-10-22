"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./VisitedSearchPanel.module.scss";

const VisitedSearchPanel = () => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent) => {
    router.push(`/search/${value}`);
    event.preventDefault();
  };

  return (
    <div className={styles.visited_block}>
      <div className={styles.visited_content}>
        <div className={styles.visited_text}>
          <h1>Welocome!</h1>
          <h2>Millions movies,serials are waiting you! Explore it now!</h2>
        </div>
        <div className={styles.visited_search_block}>
          <form className={styles.visited_form} onSubmit={handleSubmit}>
            <label>
              <input
                placeholder="Find a movie,series...."
                className={styles.visited_search_panel}
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </label>
            <input
              className={styles.search_submit}
              value={"Submit"}
              type="submit"
              onSubmit={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitedSearchPanel;
