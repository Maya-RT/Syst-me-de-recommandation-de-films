import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Home"; 
import SearchResult from "./assets/SearchResult"; 
import LandingPage from "./assets/LandingPage";


function App() {
  return (
    <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/search/:id"
                        element={<SearchResult />}
                    />
                </Routes>
            </Router>
        </div>
  );
}

export default App;

