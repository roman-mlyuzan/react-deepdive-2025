import MissionBoard from "../MissionBoard";
import type { Hero } from "../../types/hero";
import styles from "./Header.module.css";

type Props = {
  hero: Hero;
};

function Header({ hero }: Props) {
  return (
    <header className={styles.header}>
      <h1>Superhero HQ</h1>
      <MissionBoard hero={hero} />
    </header>
  );
}

export default Header;
