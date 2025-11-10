import type { Hero } from "../types/hero";
import styles from "./CatchphraseDisplay.module.css";

type Props = {
  hero: Hero;
};

export default function CatchphraseDisplay({ hero }: Props) {
  return (
    <div className={styles.catchphraseDisplay}>
      <h3>Hero Catchphrase</h3>
      <p className={styles.quote}>"{hero.catchphrase}"</p>
      <p className={styles.author}>- {hero.name}</p>
    </div>
  );
}
