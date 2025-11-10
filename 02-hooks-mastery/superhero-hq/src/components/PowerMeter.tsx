import type { Hero } from "../types/hero";

type Props = {
  hero: Hero;
};

export default function PowerMeter({ hero }: Props) {
  return (
    <div>
      <h3>Power Meter</h3>
      <p>Hero: {hero.name}</p>
      <p>Power Level: {hero.powerLevel}</p>
      <p>Costume: {hero.costume}</p>
    </div>
  );
}
