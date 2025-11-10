import { useHero } from "../context/HeroContext";
import styles from "./PowerMeter.module.css";

export default function PowerMeter() {
  const { hero } = useHero();

  return (
    <div className={styles.powerMeter}>
      <h3>Power Meter</h3>
      <p>
        Hero: <span>{hero.name}</span>
      </p>
      <p>
        Power Level:{" "}
        <span className={styles.powerLevel}>{hero.powerLevel}</span>
      </p>
      <p>
        Costume: <span>{hero.costume}</span>
      </p>
    </div>
  );
}
