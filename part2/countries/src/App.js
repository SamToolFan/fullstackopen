import { useState, useEffect } from 'react'
import axios from 'axios'

import FilterCountries from './components/FilterCountries'
import ShowListCountries from './components/ShowListCountries'

const App = () => 
{
  const [countries, setCountries] = useState([])
  const [FilterName, setFilter] = useState('')
  const [weather, setWeather] = useState([])
  const [latlon, setLatlon] = useState(['0','0'])
 
  const maxcountries = 10
  // various keys registered because after an infinite rendering loop the key got blocked :/
  //const Apikey = '193d653220116430404340d2849ab56a'   //zpam_zpam
  //const Apikey = 'a0ba2de2426768e990183f88d215b63e'   //jimew78885@wnpop.com
  //const Apikey = '6e4eb9afe356ac3a7ddc6519c7210e81'   //njamqwxz@sharklasers.com
  const Apikey = process.env.REACT_APP_API_KEY

  let weathercall = ''

  if (latlon.length !== 0){
    weathercall = 'https://api.openweathermap.org/data/2.5/weather?lat='+latlon[0]+'&lon='+latlon[1]+'&APPID='+Apikey
  }

  useEffect(() => {
    //console.log('effect countries')
    axios
      .get('https://restcountries.com/v3.1/all') // All countries
//      .get('https://restcountries.com/v3.1/name/ger') // a short list containing only ger countries
      .then(response => {
        //console.log('promise countries fulfilled')
        setCountries(response.data)
      })
  }, [])
  //console.log('render', countries.length, 'countries')

  useEffect(() => {
    //console.log('effect weather')
    axios
      .get(weathercall)
      .then(response => {
      //console.log('promise weather fulfilled')
      setWeather(response.data)
      })
  }, [weathercall])
  //console.log('render', weather, 'cities weather')

  const handleFilter = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const ShowListCountriesReturn= ShowListCountries({latlon, setLatlon, countries, FilterName, maxcountries, weather})
  const FilterReturn = FilterCountries({latlon, setLatlon, countries, FilterName, maxcountries, weather})

  //console.log(FilterReturn)
  return (
      <div>
        <h2>Countries</h2>
        <div>
          Find countries: <input  value={FilterName} onChange={handleFilter}/>
        </div>
        {ShowListCountriesReturn}
        {FilterReturn}
      </div>
  )
}


export default App