
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function Header() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

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
                    <li className="nav-item d-block d-lg-none">
                        <Link className="nav-link nav-icon search-bar-toggle" to="#">
                            <i className="bi bi-search"></i>
                        </Link>
                    </li>

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
                                <Link to="/deconnection" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Se déconnecter</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;
