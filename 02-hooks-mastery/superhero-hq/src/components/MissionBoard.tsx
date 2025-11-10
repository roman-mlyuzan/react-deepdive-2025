import type { Hero } from "../types/hero";
import styles from "./MissionBoard.module.css";

type Props = {
  hero: Hero;
};

export default function MissionBoard({ hero }: Props) {
  return (
    <div className={styles.missionBoard}>
      <h3>Mission Board</h3>
      <p>Active Hero: {hero.name}</p>
      <p>Alias: {hero.alias}</p>
    </div>
  );
}
