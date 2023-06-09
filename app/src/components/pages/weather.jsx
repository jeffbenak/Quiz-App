import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Weather() {

  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [zipButton, setZipButton] = useState(true);
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [city, setCity] = useState('');
  const [icon, setIcon] = useState('');
  const [clearButton, setClearButton] = useState(false);
  const [description, setDescription] = useState('');
  const [showLatLon, setShowLatLon] = useState(false);
  const [showWeatherButton, setShowWeatherButton] = useState(false);
  const [current, setCurrent] = useState('');
  const [zipError, setZipError] = useState('');

  const APIKey = 'fbb08152a4c7efaee1be8de10432c3f7';

  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${APIKey}`;

  function handleSubmit() {
    console.log('Submitted')
  }

  function clearAll() {
    setZip('');
    setZipButton(true);
    setLon('');
    setLat('');
    setZipError('');
    setIcon('');
    setShowWeatherButton(false);
    setShowLatLon(false);
    setCity('');
    setCurrent('');
  }

   function Geocode() {
    fetch(geoUrl)
    .then(res => res.json())
    .then(data => { 
    console.log(data)
    const lon = data['lon'];
    const lat = data['lat'];
    const code = data['cod'];
    const city = data['name'];
    console.log(city)
    if (code === '404') {
      setZipError('Invalid Zip');
      setLon('');
      setLat('');
    } else if (code === '400') {
      setZipError('Please Enter a Zip Code');
    } else {
      setZipError('');
      setZipButton(false);
      setLat(lat);
      setLon(lon);
      setShowWeatherButton(true);
      setShowLatLon(true);
      setCity(city);
      setClearButton(true);
    }
    }).catch(error => console.log(error)
    );
   };

    function WeatherApi(){
    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
         console.log(data);
         console.log(lat);
        //  const weather = data['list'][0]['weather'][0]['icon'];
         const icon = "https://openweathermap.org/img/wn/" + data['list'][0]['weather'][0]['icon'] + ".png";
         const sunrise = data['city']['sunrise'];
         const sunset = data['city']['sunset'];
         const date = new Date(sunset).toLocaleTimeString('en-US');
         const city = data['city']['name'];
         const current = data['list'][0]['weather'][0]['description'];
        //  const hours = date.getHours();
        //  const minutes = '0' + date.getMinutes();
        //  const seconds = '0' + date.getSeconds();
        //  const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
         setIcon(icon);
         setShowWeatherButton(false);
         const current2 = current.charAt(0).toUpperCase() + current.slice(1);
         setCurrent(current2);
         console.log(current2);
    })
    .catch(error => console.log(error)
    );
    };

    return (
        <>

        <div className="enter">

        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label></Form.Label>
        <Form.Control 
          type="text" size="lg" placeholder="Enter Zip"
          value={zip}
          className="zipinput" 
          onChange={(event) => setZip(event.target.value)} 
        />
        {/* <Form.Control 
          type="text" size="lg" placeholder="Enter Country"
          value={country}
          className={showWeatherButton ? "countrybox" : "none"}
          onChange={(event) => setCountry(event.target.value)} 
        /> */}
      </Form.Group>
      <p className="error">{zipError}</p>
      {/* <h3 className={showLatLon ? 'show' : 'none'}>Your Longitude: {lon}</h3> */}
      <h3 className={showLatLon ? 'show' : 'none'}>Your City: {city}</h3>
      
      <div className="forecast">
      <p className={current ? 'show' : 'none'}>Weather Forecast:
      <img className="weathericon" src={icon}></img>
      </p>
      <p>{current}</p>
      </div>
      </Form>


        </div>

        
        <button className={zipButton ? "submit" : "none"} onClick={() => {Geocode(); handleSubmit();}}>Submit Zip</button>

        <button className={showWeatherButton ? "weatherbutton" : "none"} onClick={WeatherApi}>Click for Weather Foreacast</button>

        <button className={clearButton ? "weatherbutton" : "none"} onClick={clearAll}>Clear All</button>

  


        </>
    )
}