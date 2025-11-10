import type { Hero } from "../types/hero";

type Props = {
  hero: Hero;
};

export default function CatchphraseDisplay({ hero }: Props) {
  return (
    <div>
      <h3>Hero Catchphrase</h3>
      <p>"{hero.catchphrase}"</p>
      <p>- {hero.name}</p>
    </div>
  );
}
