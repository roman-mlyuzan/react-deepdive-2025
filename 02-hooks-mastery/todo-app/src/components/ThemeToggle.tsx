import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle-container">
      <p>Current theme: {theme}</p>
      <button
        className={`theme-toggle-button active`}
        onClick={() =>
          setTheme((prev: "light" | "dark") =>
            prev === "light" ? "dark" : "light"
          )
        }
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
