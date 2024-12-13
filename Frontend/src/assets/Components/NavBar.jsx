import { Link } from "react-router-dom";
import "./styles/NavBarStyles.css";
import Logo from "./media/logo_jane_does.png";

const NavBar = ({ isHome }) => {
    
    return (
        <div className="container header">
            <Link to="/ ">
                <img src={Logo} className="logo" alt="" />
            </Link>
            {/* if isHome then the button is the return button else its the home button*/}
            {isHome ? (
                <a href="/" className="header-btn1 bouncy">
                    <i className="fas fa-home"></i> Home
                </a>
            ) : (
                <a
                    href= ""
                    target="_blank"
                    rel="noreferrer"
                    className="header-btn1 bouncy"
                >
                    <i className="fa-brands fa-github"></i> Retour
                </a>
            )}
        </div>
    );
};

export default NavBar;