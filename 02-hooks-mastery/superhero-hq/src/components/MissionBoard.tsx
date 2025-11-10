import { useHero } from "../context/HeroContext";
import styles from "./MissionBoard.module.css";

export default function MissionBoard() {
  const { hero } = useHero();

  return (
    <div className={styles.missionBoard}>
      <h3>Mission Board</h3>
      <p>Active Hero: {hero.name}</p>
      <p>Alias: {hero.alias}</p>
    </div>
  );
}
