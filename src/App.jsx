import { useEffect, useState } from 'react'

import './App.css'

import Searchicon from "./assets/search.png";
import Humidity from "./assets/humidity.png";
import Rain from "./assets/rain.png";
import RealRain from "./assets/realrain.png";
import Sun from "./assets/sun.png";
import Wind from "./assets/wind.png";
import Suncloud from "./assets/suncloud.png";
import Snow from "./assets/snow.png";

const WeatherDetails =({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
    <div className="image">
      <img src={icon} alt='image'/>
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className='cord'>
    <div>
      <span className='lat'>Longitude </span>
      <span>{log}</span>
    </div>
    <div>
      <span className='lat'>Latitude </span>
      <span>{lat}</span>
    </div>
    </div>
    <div className="data-contain">
      <div className="element">
        <img src={Humidity} alt='humidy' className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={Wind} alt='humidy' className='icon'/>
        <div className="data">
          <div className="humidity-percent">{wind} Km/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>
  )
}



function App() {
  let api_key="fd54af103a132043eecef417cbf02181";

const [text,setText]= useState("Chennai")
const [icon,setICon]=useState(Snow);
const [temp,setTemp]=useState(0);
const [city,setCity]=useState("Chennai");
const [country, setCountry]=useState("IN");
const [lat,setLat]= useState(0);
const [log,setlog]=useState(0)
const [humidity,setHumidity]=useState(0);
const [wind,setWind]=useState(0);
const [cityNotFound, setCityNotFound]= useState(false);
const [Loading, setLoading]=useState(false);

const weatherIConmap={
  "01d": Sun,
  "01n": Sun,
  "02d": Sun,
  "02n": Sun,
  "03d": Rain,
  "03n": Rain,
  "04d": Rain,
  "04n": Rain,
  "09d": RealRain,
  "09n": RealRain,
  "10d": RealRain,
  "10n": RealRain,
  "13d": Snow,
  "13n": Snow,
}



const search= async ()=>{
  setLoading(true);
  let Url= `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=fd54af103a132043eecef417cbf02181&units=Metric`;
try {
let res= await fetch(Url);
let data= await res.json();
if(data.cod==="404"){
  console.error("City not found");
  setCityNotFound(true);
  setLoading(false);
  return;
}
setHumidity(data.main.humidity);
setWind(data.wind.speed);
setTemp(Math.floor(data.main.temp));
setCity(data.name);
setCountry(data.sys.country);
setLat(data.coord.lat);
setlog(data.coord.lon);
const weatherIconCode = data.weather[0].icon;
setICon(weatherIConmap[weatherIconCode] || Sun);
setCityNotFound(false);
}
catch(error){
console.log("An error occured")
}
finally {
setLoading(false);
}
};
const handlecity =(e)=>{
  setText(e.target.value);
}
const handlekeydown =(e)=>{
  if(e.key === "Enter"){
    search();
  }
}
useEffect(function (){
  search();
},[]);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type='text'
           className='cityInput'
            placeholder='Search City'
            onChange={handlecity}
            onKeyDown={handlekeydown}
            value={text}
            />
          <div className="search-icon" onClick={()=> search()}>
            <img src={Searchicon} alt='search'/>
          </div>
        </div>
       
        {Loading && <div className='loading-message'> Loading... </div>}
        {/* {error && <div className='error-message'> {error} </div>} */}
        {cityNotFound && <div className='city-notfound'> City Not Found</div>}
       
   { !Loading && !cityNotFound && <WeatherDetails icon={icon}
      temp={temp}
      city={city} 
      country={country}
      lat={lat}
      log={log}
      humidity={humidity}
      wind={wind}
      />}
      </div>
      
    </>
  )
}

export default App
