import type { Hero } from "../types/hero";
import styles from "./PowerMeter.module.css";

type Props = {
  hero: Hero;
};

export default function PowerMeter({ hero }: Props) {
  return (
    <div className={styles.powerMeter}>
      <h3>Power Meter</h3>
      <p>Hero: <span>{hero.name}</span></p>
      <p>
        Power Level: <span className={styles.powerLevel}>{hero.powerLevel}</span>
      </p>
      <p>Costume: <span>{hero.costume}</span></p>
    </div>
  );
}
