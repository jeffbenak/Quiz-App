import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import moment from 'moment';
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
  const [iconTwo, setIconTwo] = useState('');
  const [iconThree, setIconThree] = useState('');
  const [temperature, setTemperature] = useState('');
  const [temperature2, setTemperature2] = useState('');
  const [temperature3, setTemperature3] = useState('');
  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [time, setTime] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [current, setCurrent] = useState('');
  const [currentSecond, setCurrentSecond] = useState('');
  const [currentThird, setCurrentThird] = useState('');
  const [zipError, setZipError] = useState('');
  const [windSpeeds, setWindSpeeds] = useState('');
  const [windSpeeds2, setWindSpeeds2] = useState('');
  const [windSpeeds3, setWindSpeeds3] = useState('');
  

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
    setClearButton(false);
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
         const iconTwo = "https://openweathermap.org/img/wn/" + data['list'][1]['weather'][0]['icon'] + ".png";
         const iconThree = "https://openweathermap.org/img/wn/" + data['list'][2]['weather'][0]['icon'] + ".png";

         const temp = data['list'][0]['main']['temp'];
         // Temperature is in kelvin, so here I convert the temperature to fahrenheit then use math.trunc to make it a whole number
         const temp1 = (temp-273.15) * 9/5 + 32;
         const temperature = Math.trunc(temp1);

         const temp2 = data['list'][1]['main']['temp'];
         const tempTwo = (temp2-273.15) * 9/5 + 32;
         const temperature2 = Math.trunc(tempTwo);

         const temp3 = data['list'][2]['main']['temp'];
         const tempThree = (temp3-273.15) * 9/5 + 32;
         const temperature3 = Math.trunc(tempThree);

        //  Wind speeds returned from the openweather api is in meters per second, so I multiple the number by 2.237 to convert it to miles per hour,
        //  and also use math.trunc to make it a whole number
         const wind = data['list'][0]['wind']['speed'];
         const wind1 = wind * 2.237;
         const windSpeeds = Math.trunc(wind1);

         const wind2 = data['list'][1]['wind']['speed'];
         const windTwo = wind2 * 2.237;
         const windSpeeds2 = Math.trunc(windTwo);

         const wind3 = data['list'][2]['wind']['speed'];
         const windThree = wind3 * 2.237;
         const windSpeeds3 = Math.trunc(windThree);


         const newDate = data['list'][0]['dt'];
         const time = new Date(newDate * 1000);
         const newTime = moment(time,'X').format('h:mm a').toUpperCase();
         const newDate2 = time.toLocaleDateString('en-US');

         const secondDate = data['list'][1]['dt'];
         const time2 = new Date(secondDate * 1000);
         const newTime2 = moment(time2,'X').format('h:mm a').toUpperCase();
         const newDate3 = time2.toLocaleDateString('en-US');

         const thirdDate = data['list'][2]['dt'];
         const time3 = new Date(thirdDate * 1000);
         const newTime3 = moment(time3,'X').format('h:mm a').toUpperCase();
         const newDate4 = time3.toLocaleDateString('en-US');

         
         const current = data['list'][0]['weather'][0]['description'];
         const current2 = current.charAt(0).toUpperCase() + current.slice(1);

         const secondCurrent = data['list'][1]['weather'][0]['description'];
         const currentSecond = secondCurrent.charAt(0).toUpperCase() + secondCurrent.slice(1);
   
         const thirdCurrent = data['list'][2]['weather'][0]['description'];
         const currentThird = thirdCurrent.charAt(0).toUpperCase() + thirdCurrent.slice(1);

         setIcon(icon);
         setIconTwo(iconTwo);
         setIconThree(iconThree);
         setTemperature(temperature);
         setTemperature2(temperature2);
         setTemperature3(temperature3);
         setShowWeatherButton(false);
         setTempTable(true);
         setDate(newDate2);
         setDate2(newDate3);
         setDate3(newDate4);
         setTime(newTime);
         setTime2(newTime2);
         setTime3(newTime3)
         setWindSpeeds(windSpeeds);
         setWindSpeeds2(windSpeeds2);
         setWindSpeeds3(windSpeeds3);
         setCurrent(current2);
         setCurrentSecond(currentSecond);
         setCurrentThird(currentThird);
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
        <tbody>
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
        <td><p>{date}</p>{time}</td>
      </tr>
      <tr>
        <td>{currentSecond}<img className="weathericon" src={iconTwo}></img></td>
        <td>{temperature2} °F</td>
        <td>{windSpeeds2} mph</td>
        <td><p>{date2}</p>{time2}</td>
      </tr>
      <tr>
        <td>{currentThird}<img className="weathericon" src={iconThree}></img></td>
        <td>{temperature3} °F</td>
        <td>{windSpeeds3} mph</td>
        <td><p>{date3}</p>{time3}</td>
      </tr>
      </tbody>
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