import React, { useState } from 'react';
import './search.css';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Llama a la función onSearch con el valor de la ciudad
    onSearch(city);
    // Limpiar el campo de entrada después de enviar el formulario
    setCity('');
  };

  return (
    <div className='container-search'>
      <form onSubmit={handleSubmit} className='form-search'>
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={city}
          onChange={handleChange}
          className='input-search'
        />
       <button type="submit" className='btn-search'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icono-search">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
</button>

      </form>
    </div>
  );
};

export default Search;