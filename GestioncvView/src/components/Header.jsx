import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

function Header() {
  const { setAuth } = useContext(AuthContext); // Accéder à la fonction de mise à jour de l'authentification
  const navigate = useNavigate(); // Assurez-vous d'importer useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {

        // Ici, vous pouvez ajouter votre logique de vérification du token
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token'); // Supprimer le token
    localStorage.removeItem('email'); // Supprimer l'email et autres données
    setAuth(false); // Mettre à jour l'état d'authentification
    console.log('Utilisateur déconnecté.');
    navigate('/home'); // Rediriger vers la page d'accueil
  };



  return (
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="logo d-flex align-items-center" to="/">
            <img src="../assets/img/logo.jpg" alt="" />
            <span className="d-none d-lg-block" style={{ fontSize: '1.4rem', color: '#808000' }}>Gestion Cv</span>
          </Link>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                <img src="/assets/img/profile-img.png" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{`${localStorage.getItem('email')}`}</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{`${localStorage.getItem('email')}`}</h6>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item d-flex align-items-center" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Se déconnecter</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;
