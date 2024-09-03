import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      // Check if error response exists to provide a more detailed error message
      if (err.response) {
        setError(`Error: ${err.response.data.error}`);
      } else {
        setError('Failed to fetch weather data');
      }
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
          required
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind_speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
