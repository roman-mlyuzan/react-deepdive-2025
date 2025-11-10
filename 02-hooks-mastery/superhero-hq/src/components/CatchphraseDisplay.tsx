import { useHero } from "../context/HeroContext";
import styles from "./CatchphraseDisplay.module.css";

export default function CatchphraseDisplay() {
  const { hero } = useHero();

  return (
    <div className={styles.catchphraseDisplay}>
      <h3>Hero Catchphrase</h3>
      <p className={styles.quote}>"{hero.catchphrase}"</p>
      <p className={styles.author}>- {hero.name}</p>
    </div>
  );
}
