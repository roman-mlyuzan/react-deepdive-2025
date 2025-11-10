import React from "react";
import PowerMeter from "../PowerMeter";
import CatchphraseDisplay from "../CatchphraseDisplay";
import type { Hero } from "../../types/hero";

type Props = {
  hero: Hero;
};

export default function MainPanel({ hero }: Props) {
  return (
    <main>
      <h2>Main Panel</h2>
      <PowerMeter hero={hero} />
      <CatchphraseDisplay hero={hero} />
    </main>
  );
}
