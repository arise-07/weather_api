
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleCity(e) {
    setCity(e.target.value);
  }

  function getWeather() {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fb8af86d2c40eb20d155fcc0ff3a7df6`
    )
      .then(function (response) {
        const data = response.data;

        setTemperature(data.main.temp);
        setWeather(data.weather[0].main);
        setDescription(data.weather[0].description);
        setError("");
      })
      .catch(function (error) {
        setError("City not found!");
        setTemperature("");
        setWeather("");
        setDescription("");
      });
  }

  return (
    <div className="container">
      <div className="container_one">
        <h1>Weather Report</h1>
        <p>I can get you a weather report about your City</p>

        <input
          type="text"
          placeholder="Enter a City"
          value={city}
          onChange={handleCity}
        />
        <br />
        <button onClick={getWeather}>Get Report</button>

        {error && <h3 style={{ color: "red" }}>{error}</h3>}

        {weather && (
          <>
            <h3>Weather: {weather}</h3>
            <h3>Temperature: {temperature} °C</h3>
            <h3>Description: {description}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;