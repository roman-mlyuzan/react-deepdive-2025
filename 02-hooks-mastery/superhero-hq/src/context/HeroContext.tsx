import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { Hero } from "../types/hero";

type HeroContextType = {
  hero: Hero;
  setHero: React.Dispatch<React.SetStateAction<Hero>>;
};
const HeroContext = createContext<HeroContextType | undefined>(undefined);

interface HeroProviderProps {
  children: ReactNode;
}

export function HeroProvider({ children }: HeroProviderProps) {
  const [hero, setHero] = useState<Hero>({
    name: "Captain Typescript",
    alias: "The Type Guardian",
    powerLevel: 9001,
    catchphrase: "Any type can be 'any', but should it?",
    costume: "blue-spandex",
    sidekick: "Console Logger",
  });
  return (
    <HeroContext.Provider value={{ hero, setHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);

  if (!context) {
    throw new Error("useHero must be used within a HeroProvider");
  }

  return context;
}
