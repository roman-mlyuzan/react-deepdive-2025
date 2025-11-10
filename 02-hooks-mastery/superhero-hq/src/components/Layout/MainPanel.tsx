import React from "react";
import PowerMeter from "../PowerMeter";
import CatchphraseDisplay from "../CatchphraseDisplay";
import type { Hero } from "../../types/hero";
import styles from "./MainPanel.module.css";

type Props = {
  hero: Hero;
};

export default function MainPanel({ hero }: Props) {
  return (
    <main className={styles.mainPanel}>
      <h2>Main Panel</h2>
      <div className={styles.content}>
        <PowerMeter hero={hero} />
        <CatchphraseDisplay hero={hero} />
      </div>
    </main>
  );
}
