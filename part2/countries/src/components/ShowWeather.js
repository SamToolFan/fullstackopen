import React from 'react'

const ShowWeather = (props) => 
{
  //console.log('lat',props.lat,'lon',props.lon,'weather',props.weather)

  const weathericon = 'http://openweathermap.org/img/wn/'+props.weather.weather[0].icon+'.png'
  const temperature = props.weather.main.temp - 273.15

  return (
      <>
        Temperature = {temperature.toFixed(2)} Celcius<br />
        <img title={props.weather.weather[0].main} alt={props.weather.weather[0].main} src={weathericon}></img> <br />
        {props.weather.weather[0].main} <br />
        Wind = {props.weather.wind.speed} m/s 

      </>
  )
}

export default ShowWeather