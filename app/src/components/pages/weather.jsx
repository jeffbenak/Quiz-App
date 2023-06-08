import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Weather() {

  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [icon, setIcon] = useState('');
  const [showLatLon, setShowLatLon] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [zipError, setZipError] = useState('');

  const APIKey = 'fbb08152a4c7efaee1be8de10432c3f7';

  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${APIKey}`;

  function handleSubmit() {
    console.log('Submitted')
  }

  function clearAll() {
    setZip('');
    setLon('');
    setLat('');
    setZipError('');
    setShowWeather(false);
    setShowLatLon(false);
  }

   function Geocode() {
    fetch(geoUrl)
    .then(res => res.json())
    .then(data => { 
    console.log(data)
    const lon = data['lon'];
    const lat = data['lat'];
    const code = data['cod'];
    if (code === '404') {
      setZipError('Invalid Zip');
      setLon('');
      setLat('');
    } else if (code === '400') {
      setZipError('Please Enter a Zip Code');
    } else {
      setLat(lat);
      setLon(lon);
      setZipError('');
      setShowWeather(true);
      setShowLatLon(true);
    }
    console.log(lon, lat);
    }).catch(error => console.log(error)
    );
   };

    function WeatherApi(){
    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
         console.log(data);
         console.log(lat);
         const weather = data['list'][0]['weather'][0]['icon'];
         let icon = "https://openweathermap.org/img/wn/" + data['list'][0]['weather'][0]['icon'] + ".png";
         setIcon(icon);
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
        <Form.Control 
          type="text" size="lg" placeholder="Enter Country"
          value={country}
          className={showWeather ? "countrybox" : "none"}
          onChange={(event) => setCountry(event.target.value)} 
        />
      </Form.Group>
      {/* <h3>{zip}</h3> */}
      <h3 className={showLatLon ? 'show' : 'none'}>Your Longitude: {lon}</h3>
      <h3 className={showLatLon ? 'show' : 'none'}>Your Latitude: {lat}</h3>
      <p className="error">{zipError}</p>
      <img className="weathericon" src={icon}></img>
      </Form>


        </div>

        <button className={showWeather ? "weatherbutton" : "none"} onClick={WeatherApi}>Click for Weather Foreacast</button>

        <button className="submit" onClick={() => {Geocode(); handleSubmit();}}>Submit Zip</button>

        <button onClick={clearAll}>Clear All</button>

  


        </>
    )
}