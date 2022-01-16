import './App.css';
import React, {useEffect, useState} from 'react'
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import './App.css'
function App() {

const [place, setPlace] = useState('new york')
const [placeInfo, setPlaceInfo] = useState({})

useEffect(() => {
  handleFetch();
}, []);
  

const handleFetch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7194efff41464f2d92c82148221601&q=${place}&aqi=no`)
    .then((response) => {
      return response.json();
    })
    .then((data) => 
      setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        farenheit: {
          current: data.current.temp_c,
        },
        condition: data.current.condition.text
    })).catch(error => console.log(error.message))
    setPlace("");
  }
 
  console.log(placeInfo);

  return (
    <div className="App" style={
      placeInfo.condition?.toLowerCase() === "clear" ||
      placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Clear})` }
        : placeInfo.condition?.includes("cloudy")
        ? { backgroundImage: `url(${Cloudy})` }
        : placeInfo.condition?.toLowerCase().includes("rainy")
        ? { backgroundImage: `url(${Rainy})` }
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${Snow})` }
        : { backgroundImage: `url(${Overcast})` }
    }
  >
      <div className='search-input'>
      <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button className='search__btn' onClick={handleFetch}>Search</button>
      </div>
      <div className='weather-container'>
        <div className='top-part'>
          <h1>{placeInfo.farenheit?.current}° C</h1>
          <div className='condition-high-low'>
            <h1>{placeInfo.condition}</h1>
          </div>
        </div>
        <h2>{placeInfo.name}, {placeInfo.country}</h2>
      </div>
    </div>
  );
}

export default App;
