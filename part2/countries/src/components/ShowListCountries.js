import { useState, useEffect } from 'react'
import ShowOneCountry from './ShowOneCountry'

const ShowListCountries = (props) =>
{
  //console.log(props.countries)
  //console.log(props.filter)
  const CountryFilter = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
  //console.log(CountryFilter)

  const showlist = ((CountryFilter.length === 1) || (CountryFilter.length >=  props.maxcountries)) ? 0 : 1 // Don't show the list when the list has one match (and thus the details are shown)
  
  const [clickedCountry, setClickedCountry] = useState('')

  const showCountry = (event) => {
    event.preventDefault()
    //console.log(event)
    //console.log('button clicked', clickedCountry)
    //console.log('button clicked', event.target[0].value)

    // The 'if else' makes that you turn that 
    //if the clickedCountry is different from the current clickedCountry (can be empyt also) the new clickedCountry is set
    //if the same clickedCountry is clicked again you empty the clickedCountry so nothing is shown
    event.target[0].value!==clickedCountry ? setClickedCountry(event.target[0].value) : setClickedCountry('')
  }

  const OneCountryData = ShowOneCountry(props.countries, clickedCountry)

  if (showlist) { 
    // The 'if else' below makes that the OneCountryData is shown underneath the country clicked
    return(   
      <div>
        <>
          {CountryFilter.map(country => 
            <form key={country.name.official} onSubmit={showCountry}>
            <input type="hidden" value={country.name.official}/><br />
            <button type="submit" onChange={setClickedCountry}>Show</button>
            {' '}{country.name.common}<br />{clickedCountry===country.name.official ? OneCountryData : ''} 
            </form>
            )
          }
        </>
      </div>
    )
  }
  else {
    return ('') 
  }
}

export default ShowListCountries