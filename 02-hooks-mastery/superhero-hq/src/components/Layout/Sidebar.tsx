import React from "react";
import SidekickCorner from "../SidekickCorner";
import type { Hero } from "../../types/hero";
import styles from "./Sidebar.module.css";

type Props = {
  hero: Hero;
};

export default function Sidebar({ hero }: Props) {
  return (
    <aside className={styles.sidebar}>
      <h2>Sidebar</h2>
      <SidekickCorner hero={hero} />
    </aside>
  );
}
