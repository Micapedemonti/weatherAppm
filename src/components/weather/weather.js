import React, { useState, useEffect } from 'react';
import './weather.css';
import axios from 'axios';

// Función para traducir la descripción del clima
function translateDescription(description) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" + description, false);
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  return response[0][0][0];
}

const WeatherApp = ({ searchedCity, onTemperatureChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityNotFound, setCityNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://weatherappm.onrender.com//weather', {
          params: {
            ciudad: searchedCity,
            apiKey: 'be454d68474e61c070edc0083e4b91a0'
          }
        });

        const translatedData = {
          ...response.data,
          weather: [{
            ...response.data.weather[0],
            description: translateDescription(response.data.weather[0].description)
          }]
        };

        // Redondear las temperaturas sin decimales
        translatedData.main.temp = Math.round(translatedData.main.temp);
        translatedData.main.temp_min = Math.round(translatedData.main.temp_min);
        translatedData.main.temp_max = Math.round(translatedData.main.temp_max);

        setWeatherData(translatedData);

        // Actualizar la temperatura en App.js
        onTemperatureChange(translatedData.main.temp);

        // Restablecer el estado de ciudad no encontrada
        setCityNotFound(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Si hay un error, establecer el estado de ciudad no encontrada
        setCityNotFound(true);
      }
    };

    if (searchedCity) {
      fetchData();
    }
  }, [searchedCity, onTemperatureChange]);

  return (
    <div className='container-clima'>
      {weatherData && !cityNotFound ? (
        <div className='clima-detalle'>
          <div className='clima-datos-principales'>
            <div className='clima-nombre-cielo'>
              <h2>{weatherData.name}</h2>
            </div>
            <div className='clima-temp-actual'>
              <h1>{weatherData.main.temp}°C</h1>
            </div>
          </div>
          <div className='clima-subdetalles'>
            <div className='temp-min'>
              <h1>Temp mín:</h1>
              <p>{weatherData.main.temp_min}°C</p>
            </div>
            <div className='temp-max'>
              <h1>Temp máx:</h1>
              <p> {weatherData.main.temp_max}°C</p>
            </div>
            <div className='humedad'>
              <h1>Humedad:</h1>
              <p>{weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      ) : cityNotFound ? (
        <div className="city-not-found">
          <p>Ciudad no encontrada</p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
