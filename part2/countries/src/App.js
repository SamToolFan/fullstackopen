import { useState, useEffect } from 'react'
import axios from 'axios'

import FilterCountries from './components/FilterCountries'
import ShowListCountries from './components/ShowListCountries'

const App = () => 
{
  const [countries, setCountries] = useState([])
  const [FilterName, setFilter] = useState('')
  
  const maxcountries = 10

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  //console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
      <div>
        <h2>Countries</h2>
        <div>
          Find countries: <input  value={FilterName} onChange={handleFilter}/>
        </div>
        <FilterCountries countries={countries} filter={FilterName} maxcountries={maxcountries}/>
        <ShowListCountries countries={countries} filter={FilterName} maxcountries={maxcountries}/>
      </div>
  )
}

export default App