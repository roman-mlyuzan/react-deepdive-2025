import MissionBoard from "../MissionBoard";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Superhero HQ</h1>
      <MissionBoard />
    </header>
  );
}

export default Header;
