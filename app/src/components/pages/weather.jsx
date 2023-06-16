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
  const [temperature, setTemperature] = useState('');
  const [showLatLon, setShowLatLon] = useState(false);
  const [showWeatherButton, setShowWeatherButton] = useState(false);
  const [current, setCurrent] = useState('');
  const [zipError, setZipError] = useState('');
  const [tempTable, setTempTable] = useState(false);
  

  const APIKey = 'fbb08152a4c7efaee1be8de10432c3f7';

  const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${APIKey}`;

  function handleSubmit() {
    console.log('Submitted')
  }

  function clearAll() {
    setZipButton(true);
    setShowWeatherButton(false);
    setShowLatLon(false);
    setTempTable(false);
    setZip('');
    setLon('');
    setLat('');
    setZipError('');
    setIcon('');
    setCity('');
    setCurrent('');
    setTemperature('');
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
      setZipError('Invalid Zip Code');
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

    function WeatherApi(value){
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
         const temp = data['list'][0]['main']['temp'];
         const temp1 = (temp-273.15) * 9/5 + 32;
         const temperature = Math.trunc(temp1);
         const day2 = data['list'][6]['weather'][0]['description'];
        //  const hours = date.getHours();
        //  const minutes = '0' + date.getMinutes();
        //  const seconds = '0' + date.getSeconds();
        //  const time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);1
         setIcon(icon);
         setTemperature(temperature);
         setShowWeatherButton(false);
         setTempTable(true);
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
          type="text" size="lg" placeholder="Enter Zip Code"
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
      <div className="city">
      <h3 className={showLatLon ? 'show' : 'none'}>Your City: {city}</h3>
      </div>
      
      <div className="forecast">
      <h2 className={current ? 'show' : 'none'}>Weather Forecast:</h2>


      <table className={tempTable ? 'show' : 'none'}>
      <tr>
        <th>Description</th>
        <th></th>
        <th>Temperature</th>
      </tr>
      <tr>
        <td>{current}</td>
        <td className="space"></td>
        <td>{temperature} °F</td>
      </tr>
      <tr>
        <td><img className="weathericon" src={icon}></img></td>
      </tr>
      </table>

      </div>
      </Form>


        </div>

        <div className="buttons">

      
        <button className={zipButton ? "submit" : "none"} onClick={() => {Geocode(); handleSubmit();}}>Submit Zip</button>

        <button className={showWeatherButton ? "weatherbutton" : "none"} onClick={WeatherApi}>Click for Weather Foreacast</button>

        <button className={clearButton ? "weatherbutton" : "none"} onClick={clearAll}>Clear All</button>


        </div>


        </>
    )
}