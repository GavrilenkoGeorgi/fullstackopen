import React, { useState, useEffect } from 'react'
import axios from 'axios'
import weatherApiKey from '../api_keys/openweather'

const Weather = ({ capital }) => {
  const [temp, setTemp] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDir, setWindDir] = useState('')
  const [icon, setIcon] = useState('')

  const setWeatherData = () => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${weatherApiKey}&units=metric`)
      .then(response => {

        setTemp(response.data.main.temp)
        setWindSpeed(response.data.wind.speed)
        setIcon(`http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`)

        if (response.data.wind.deg) {
          setWindDir(response.data.wind.deg)
        } else {
          setWindDir(`no data.`)
        }
      })
  }
  useEffect(setWeatherData, [])

  return (
    <div>
      <h3>Weather</h3>
      <strong>temperature: </strong> {temp} &#8451;
      <br />
      <img src={icon} alt="weather icon" />
      <br />
      <strong>wind: </strong> {windSpeed} kph, direction: {windDir}
    </div>
  );
}

export default Weather
