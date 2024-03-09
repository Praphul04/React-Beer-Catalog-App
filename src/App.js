import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [beersPerPage] = useState(12);

  useEffect(() => {
    axios.get('https://api.punkapi.com/v2/beers')
      .then(response => {
        setBeers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = beers.slice(indexOfFirstBeer, indexOfLastBeer);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const filteredBeers = currentBeers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search beers"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="beer-box">
        <div className="beer-container">
          {filteredBeers.map(beer => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(beers.length / beersPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
