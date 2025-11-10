import SidekickCorner from "../SidekickCorner";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Sidebar</h2>
      <SidekickCorner />
    </aside>
  );
}
