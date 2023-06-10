import styles from "./Header.module.scss";
import Image from "next/image";

const Header = () => {
  const dropDownList = [
    { link: "/", label: "Popular" },
    { link: "/", label: "Watching now" },
    { link: "/", label: "Expected" },
    { link: "/", label: "Best" },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.header_content_left}>
          <a href='/'>
            <Image src={"/MDLogo.svg"} width={120} height={120} alt={"aa"} />
          </a>
          <ul>
            <li>
              <div className={styles.dropdown_movies}>
                <a>Movies</a>
                <div className={styles.dropdown_content_movies}>
                  {dropDownList.map((items, i) => {
                    return (
                      <a key={i} href={`movies/${items.link}`}>
                        {items.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </li>
            <li>
              <div className={styles.dropdown_serials}>
                <a>Serials</a>
                <div className={styles.dropdown_content_serials}>
                  {dropDownList.map((items, i) => {
                    return (
                      <a key={i} href={`serials/${items.link}`}>
                        {items.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.header_content_rigt}>
          <ul>
            <div className={styles.login_box}>
              <Image src='/icon.png' alt={"asas"} width={30} height={30} />
              <a>Log In</a>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
