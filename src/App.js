// import './App.css';
// import { useState } from 'react';
// import Search from './components/search/search';
// import WeatherApp from './components/weather/weather';

// function App() {
//   const [searchedCity, setSearchedCity] = useState('');

//   const handleSearch = (city) => {
//     setSearchedCity(city);
//   };

//   return (
//     <div className="App"> 
//       <Search onSearch={handleSearch} />
//       <WeatherApp searchedCity={searchedCity} />
//     </div>
//   );
// }

// export default App;


import './App.css';
import { useState } from 'react';
import Search from './components/search/search';
import WeatherApp from './components/weather/weather';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [temperature, setTemperature] = useState(null);

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  return (
    <div className={`App ${temperature && temperature < 10 ? 'cold-weather' : ''}`}>
      <Search onSearch={handleSearch} />
      <WeatherApp searchedCity={searchedCity} onTemperatureChange={setTemperature} />
    </div>
  );
}

export default App;
