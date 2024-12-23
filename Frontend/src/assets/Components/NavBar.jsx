import { useLocation } from "react-router-dom"; // Importation de useLocation
import "./styles/NavBarStyles.css";
import Logo from "./media/logo_jane_does.png"; // Logo par défaut
import LogoSearch from "./media/logo_alt.png"; // Logo alternatif pour la page de recherche

const NavBar = ({ isHome }) => {
    const location = useLocation(); // Utilisation de useLocation pour récupérer le chemin actuel

    // Vérification si l'URL correspond à "/search/:id"
    const isSearchPage = location.pathname.startsWith("/search/");

    return (
        <div className="container header">
            {/* Affichage conditionnel du logo avec classes conditionnelles */}
            <img 
                src={isSearchPage ? LogoSearch : Logo} 
                className={`logo ${isSearchPage ? "logo-alt" : ""}`} // Ajout de la classe logo-search si sur la page de recherche
                alt="Logo" 
            />
            {/* if isHome then the button is the return button else it's the home button */}
            {isHome ? (
                <a href="/home" className="header-btn1 bouncy">
                    <i className="fas fa-home"></i> Nouvelle Recherche
                </a>
            ) : (
                <a
                    href="/"
                    className="header-btn1 bouncy"
                >
                    <i className="fa-brands fa-github"></i> Page d'Acceuil
                </a>
            )}
        </div>
    );
};

export default NavBar;


