import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Home"; // Composant principal de la page d'accueil
import SearchResult from "./assets/SearchResult"; // Composant pour la page de recherche

function App() {
  return (
    <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        exact
                        path="/search/:id"
                        element={<SearchResult />}
                    />
                </Routes>
            </Router>
        </div>
  );
}

export default App;

