import React, { useState, useEffect } from "react";

function Poste() {
    const apiUrl = 'http://localhost:8080/poste/search';
    const token = localStorage.getItem('token');
  
    const [poste, setPoste] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, token]);
  
    async function fetchData() {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                searchTerm
            }
        };
        try {
            const response = await fetch(`${apiUrl}?searchTerm=${encodeURIComponent(searchTerm)}`, requestOptions);
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            const data = await response.json();
            
            setPoste(data.data);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API:', error);
        }
    }
  
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
  
    // Filtrer les CV en fonction du terme de recherche
    const filteredCvComplet = poste.filter(cv =>
        cv.dernierPoste.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recherche par poste</h5>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Entrer le poste"
                                    />
                                </div>
                                <div className="datatable-container">
                                    <table className="table datatable">
                                        <thead>
                                            <tr>
                                                <th><b>Nom</b></th>
                                                <th>CV</th>
                                                <th>Types</th>
                                                <th>Dernier poste</th>
                                                <th>Expérience</th>
                                                <th>Durer</th>
                                                <th>Langue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCvComplet.map((cv, index) => (
                                                <tr key={cv.id}>
                                                    <td>{cv.nomComplet}</td>
                                                    <td>{cv.nomcv}</td>
                                                    <td>{cv.typeCv}</td>
                                                    <td>{cv.dernierPoste}</td>
                                                    <td>{cv.descriptionExperience}</td>
                                                    <td>{cv.dureeExperience}</td>
                                                    <td>{cv.languesPlusMaitrisees}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Poste;
