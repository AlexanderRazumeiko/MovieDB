import styles from "./VisitedSearchPanel.module.scss";

const VisitedSearchPanel = () => {
  return (
    <div className={styles.visited_block}>
      <div className={styles.visited_content}>
        <div className={styles.visited_text}>
          <h1>Welocome!</h1>
          <h2>Millions movies,serials are waiting you! Explore it now!</h2>
        </div>
        <div className={styles.visited_search_block}>
          <form className={styles.visited_form}>
            <label>
              <input
                placeholder='Find a movie,series....'
                className={styles.visited_search_panel}
              />
            </label>
            <input className={styles.search_submit} type='submit' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitedSearchPanel;
