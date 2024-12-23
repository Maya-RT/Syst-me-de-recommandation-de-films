import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Components/styles/landingPageStyle.css';
import video from './Components/media/background-video.mp4'

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Ajout de la balise vidéo */}
      <video autoPlay muted loop className="background-video">
        <source src={video} type="video/mp4" />
      </video>

      {/* Contenu de la page */}
      <div className="lan-content">
        <h1 className='lan-title'>Bienvenue</h1>
        <button className="lan-button" onClick={() => navigate('/home')}>
          Accéder au Moviegator
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

