import React, { useState } from 'react';

const api = {
  key: "9d98bb90e4306c61f846c62f0473d67d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ];

    let days = [
      "Sunday", 
      "Monday", 
      "Tuesday", 
      "Wednesday", 
      "Thursday", 
      "Friday", 
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const changeBG = () => {
    let currHours = new Date().getHours();
    if(currHours > 4 && currHours < 20){
      return false;
    } else {
      return true;
    }
  }

  const weatherIcon = (rangeId) => {
    if(rangeId >= 200 && rangeId <= 232) {
      return "weather thunderstorm";
    } else if (rangeId >= 300 && rangeId <= 321){
      return "weather drizzle";
    } else if (rangeId >= 500 && rangeId <= 531){
      return "weather rain";
    } else if (rangeId >= 600 && rangeId <= 622){
      return "weather snow";
    } else if (rangeId >= 701 && rangeId <= 781) {
      return "weather atmosphere";
    } else if (rangeId === 800) {
      return "weather warm";
    } else {
      return "weather clouds";
    }
  }
  
  return (
    <div className={changeBG() ? 'app night' : 'app'}>
     
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className={weatherIcon(weather.weather[0].id)}>
         
              </div>
            </div>
          </div>
         ) : ('')}
      </main>
    </div>
  );
}

export default App;
