import { useHero } from "../context/HeroContext";
import styles from "./SidekickCorner.module.css";

export default function SidekickCorner() {
  const { hero } = useHero();

  return (
    <div className={styles.sidekickCorner}>
      <h3>Sidekick Corner</h3>
      <p>
        Sidekick: <span className={styles.badge}>{hero.sidekick}</span>
      </p>
      <p>Partner to: {hero.name}</p>
    </div>
  );
}
