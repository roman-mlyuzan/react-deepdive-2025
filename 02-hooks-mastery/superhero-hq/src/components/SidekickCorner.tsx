import type { Hero } from "../types/hero";
import styles from "./SidekickCorner.module.css";

type Props = {
  hero: Hero;
};

export default function SidekickCorner({ hero }: Props) {
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
