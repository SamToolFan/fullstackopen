import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries' 

const App = () => 
{
  const [FilterName, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilter = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
//    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
//        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
//  console.log('render', countries.length, 'countries')

  return (
    <div>
      <h2>Countries</h2>
      <div>
          Find countries: <input  value={FilterName} onChange={handleFilter}/>
        </div>
      <ShowCountries countries={countries} filter={FilterName}/>
    </div>
  )
}

export default App