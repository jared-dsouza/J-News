import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          {" "}
          <h1>NC News</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>{" "}
      </div>
    </BrowserRouter>
  );
}
export default App;
