import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { cloudy, locationIcon, rainy, storm, sun } from "./assets";
import moment from "moment";

function App() {
  // For checking if the data has been fetched
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [image, setImage] = useState(cloudy)
  // 59.33, 18.07

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=59.33&lon=18.07&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setWeatherData(res.data);
          addImage(res.data.weather[0].main, setImage)
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    };

    getData();
  }, []);

  return (
    <div className="App">
      <>
      <h1>Stockholm Weather</h1>
      {!loading ? (
        <div className="container">
          <img src={image} alt="cloudy" className="app-img" />
          <div className="weather-info">
            {/* Degree */}
            <div className="degree">
              {/* Convert from kelvin to celcius */}
              <h1>{Math.round(weatherData.main.temp -273.15)}</h1>
              <span>&#8451;</span>
            </div>

            {/* Weather metrics */}
            <div className="metrics">
                <p>
                  Pressure : {weatherData.main.pressure} hPa
                </p>
                <p>
                  Humidity : {weatherData.main.humidity}%
                </p>
                <p>
                  {/* Convert from m/s to km/hr */}
                  Wind : {weatherData.wind.speed * 3.6} Km/hr
                </p>
            </div>
          </div>
          <div className="location-info">
            <div className="location">
              <img src={locationIcon} alt="location" />
              <h2>{weatherData.name}</h2>
            </div>
            <div>
              <h3>{moment().format('dddd')} {moment().format('HH:mm')}</h3>
              <h3>{weatherData.weather[0].main}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: "white" }}>loading...</div>
      )}
      </>
    </div>
  );
}

export default App;

const addImage = (data, setImage) => {
  if (data.includes("rain")) {
    setImage(rainy)
  } else if (data.includes("sun")) {
    setImage(sun)
  } else if (data.includes("storm")) {
    setImage(storm)
  } else {
    setImage(cloudy)
  }
}