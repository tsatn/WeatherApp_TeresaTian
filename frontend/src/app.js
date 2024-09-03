import React, { useState } from 'react';
const apiKey = 'c4b563ce29cb3e9a9ec3703b9ed3cc64'; 

const WeatherApp = () => {
  
    const [cityName, setCityName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState(null);
    const [weekdayWeatherInfo, setWeekdayWeatherInfo] = useState([]);
    const filterDailyData = (data) => {
      // Filter to get one forecast per day, at midday (12:00:00)
      return data.filter(entry => entry.dt_txt.includes("12:00:00"));
    };
    const getWeather = async () => {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeatherInfo(data);
            setWeekdayWeatherInfo([]);
            setError(null);

        } catch (err) {
            setError(err.message);
            setWeatherInfo(null);
            setWeekdayWeatherInfo([]);
        }
    };

    const getWeekdaysWeathers = async () => {

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("City not found");
          }
          const data = await response.json();
          setWeekdayWeatherInfo(filterDailyData(data.list));
          setWeatherInfo(null);
          setError(null);

      } catch (err) {
          setError(err.message);
          setWeatherInfo(null);
          setWeekdayWeatherInfo([]);
      }
  };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Weather Information</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
            />
            <button onClick={getWeather}>Get Weather</button>
            <button onClick={getWeekdaysWeathers}>Get 5 Day Weathers</button>

            <div id="weather-info" style={{ marginTop: '20px' }}>
                {error && <p>{error}</p >}
                {weatherInfo && (
                    <div>
                        <h2>{weatherInfo.name}, {weatherInfo.sys.country}</h2>
                        <p>Temperature: {weatherInfo.main.temp} °C</p >
                        <p>Weather: {weatherInfo.weather[0].description}</p >
                        <p>Humidity: {weatherInfo.main.humidity} %</p >
                        <p>Wind Speed: {weatherInfo.wind.speed} m/s</p >
                    </div>
                )}
            </div>

            <div id="forecast-info" style={{ marginTop: '20px' }}>
                {error && <p>{error}</p >}
                {weekdayWeatherInfo.length > 0 && weekdayWeatherInfo.map((day, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
                        <p>Temperature: {day.main.temp} °C</p >
                        <p>Weather: {day.weather[0].description}</p >
                        <p>Humidity: {day.main.humidity} %</p >
                        <p>Wind Speed: {day.wind.speed} m/s</p >
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default WeatherApp;