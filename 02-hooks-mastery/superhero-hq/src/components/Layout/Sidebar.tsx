import React from "react";
import SidekickCorner from "../SidekickCorner";
import type { Hero } from "../../types/hero";

type Props = {
  hero: Hero;
};

export default function Sidebar({ hero }: Props) {
  return (
    <aside>
      <h2>Sidebar</h2>
      <SidekickCorner hero={hero} />
    </aside>
  );
}
