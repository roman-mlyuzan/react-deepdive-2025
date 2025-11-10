import "./App.css";
import Header from "./components/Layout/Header";
import MainPanel from "./components/Layout/MainPanel";
import Sidebar from "./components/Layout/Sidebar";

function App() {
  const hero = {
    name: "Captain Typescript",
    alias: "The Type Guardian",
    powerLevel: 9001,
    catchphrase: "Any type can be 'any', but should it?",
    costume: "blue-spandex",
    sidekick: "Console Logger",
  };

  return (
    <div className="app-container">
      <Header hero={hero} />
      <MainPanel hero={hero} />
      <Sidebar hero={hero} />
    </div>
  );
}

export default App;
