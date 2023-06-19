import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Weather() {

  const [zipButton, setZipButton] = useState(true);
  const [clearButton, setClearButton] = useState(false);
  const [showLatLon, setShowLatLon] = useState(false);
  const [showWeatherButton, setShowWeatherButton] = useState(false);
  const [tempTable, setTempTable] = useState(false);
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [city, setCity] = useState('');
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [date, setDate] = useState('');
  const [current, setCurrent] = useState('');
  const [currentSecond, setCurrentSecond] = useState('');
  const [zipError, setZipError] = useState('');
  const [windSpeeds, setWindSpeeds] = useState('');
  

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

         // This line uses the icon link provided by openweather, and retrieves the icon that was returned from the api call. 
         // The .png at the end is needed so the name matches the icon codes from openweather, and then the icon will show up properly depending on which code is returned.
         const icon = "https://openweathermap.org/img/wn/" + data['list'][0]['weather'][0]['icon'] + ".png";

         const current = data['list'][0]['weather'][0]['description'];
         const current2 = current.charAt(0).toUpperCase() + current.slice(1);

         const temp = data['list'][0]['main']['temp'];
         // Temperature is in kelvin, so here I convert the temperature to fahrenheit then use math.trunc to make it a whole number
         const temp1 = (temp-273.15) * 9/5 + 32;
         const temperature = Math.trunc(temp1);

         const wind = data['list'][0]['wind']['speed'];
        //  Wind speeds returned from the openweather api is in meters per second, so I multiple the number by 2.237 to convert it to miles per hour,
        //  and also use math.trunc to make it a whole number
         const wind1 = wind * 2.237;
         const windSpeeds = Math.trunc(wind1);

         const date = data['list'][0]['dt_txt'];
         const secondCurrent = data['list'][1]['weather'][0]['description'];
         const currentSecond = current.charAt(0).toUpperCase() + secondCurrent.slice(1);
         setIcon(icon);
         setTemperature(temperature);
         setShowWeatherButton(false);
         setTempTable(true);
         setDate(date);
         setWindSpeeds(windSpeeds);
         setCurrent(current2);
         setCurrentSecond(currentSecond);
         console.log(date);
    })
    .catch(error => console.log(error)
    );
    };

    return (
        <>

        <div className="enter">

      <Form>
        
        <div className="zipform">

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label></Form.Label>
        <Form.Control 
          type="text" size="lg" placeholder="Enter Zip Code"
          value={zip}
          className="zipinput" 
          onChange={(event) => setZip(event.target.value)} 
        />
      </Form.Group>
      </div>

      <p className="error">{zipError}</p>
      <div className='forecast'>
      <h3 className={showLatLon ? 'show' : 'none'}>Your City: {city}</h3>

      
      <h2 className={current ? 'show' : 'none'}>Weather Forecast:</h2>


      <table className={tempTable ? 'show temptable' : 'none'}>
      <tr>
        <th>Description</th>
        <th>Temperature</th>
        <th>Wind Speeds</th>
        <th>Date/ Time</th>
      </tr>
      <tr>
        <td>{current}<img className="weathericon" src={icon}></img></td>
        <td>{temperature} °F</td>
        <td>{windSpeeds} mph</td>
        <td>{date} PM</td>
      </tr>
      <tr>
        <td>{currentSecond}</td>
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