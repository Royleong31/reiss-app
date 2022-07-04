import { Routes, Route, useLocation } from "react-router-dom";
import Home from "pages/home";
import About from "pages/about";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
