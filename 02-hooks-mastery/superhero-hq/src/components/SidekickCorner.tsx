import type { Hero } from "../types/hero";

type Props = {
  hero: Hero;
};

export default function SidekickCorner({ hero }: Props) {
  return (
    <div>
      <h3>Sidekick Corner</h3>
      <p>Sidekick: {hero.sidekick}</p>
      <p>Partner to: {hero.name}</p>
    </div>
  );
}
