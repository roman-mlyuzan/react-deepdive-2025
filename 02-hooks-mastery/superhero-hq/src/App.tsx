import "./App.css";
import Header from "./components/Layout/Header";
import MainPanel from "./components/Layout/MainPanel";
import Sidebar from "./components/Layout/Sidebar";
import { HeroProvider } from "./context/HeroContext";

function App() {
  return (
    <HeroProvider>
      <div className="app-container">
        <Header />
        <MainPanel />
        <Sidebar />
      </div>
    </HeroProvider>
  );
}

export default App;
