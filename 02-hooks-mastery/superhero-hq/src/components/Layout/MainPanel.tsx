import PowerMeter from "../PowerMeter";
import CatchphraseDisplay from "../CatchphraseDisplay";
import styles from "./MainPanel.module.css";

export default function MainPanel() {
  return (
    <main className={styles.mainPanel}>
      <h2>Main Panel</h2>
      <div className={styles.content}>
        <PowerMeter />
        <CatchphraseDisplay />
      </div>
    </main>
  );
}
