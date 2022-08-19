import { useState } from 'react'
import ShowOneCountry from './ShowOneCountry'

const ShowListCountries = (props) =>
{
  //console.log(props.countries)
  //console.log(props.filter)
  const CountryFilter = props.countries.filter(country => country.name.common.toLowerCase().includes(props.FilterName.toLowerCase()))
  //console.log(CountryFilter)

  let showlist = ((CountryFilter.length === 1) || (CountryFilter.length >=  props.maxcountries)) ? 0 : 1 // Don't show the list when the list has one match (and thus the details are shown)
  
  const Findcountry = typeof CountryFilter.find(country => country.name.common.toLowerCase() === props.FilterName.toLowerCase())
  //If Findcountry is not 'undefined' then more than one country is found
  if (Findcountry !== 'undefined') // Test whether a country is an exact match
  {
    // The problem is that in some cases I tried to show two weather reports on page resulting in endless rerendering
    // I've solved it but it is not a very elegant solution... typically me :D
    
    // If you show the list when an exact match is found then you allow pressing a button to show the details
    // But since you also are already showing the exact match it gets in an infinite rerendering loop. So don't show the loop
    // (or rewrite the code :D - but I don't feel like doing that - I learned my lesson ;)
    // Better I just realize the other way around is also true - having clicked a button and then 
        //continue to write to an exact match brings similar problems - solved below
    // basically using the altered lat lon (or the weather URL) might not be the proper way of doing it
    showlist = 0
  }

  const [clickedCountry, setClickedCountry] = useState('')

  const showCountry = (event) => {
    event.preventDefault()
    //console.log(event)
    //console.log('button clicked', clickedCountry)
    //console.log('button clicked', event.target[0].value)

    // The 'if else' makes that you turn showing one country one or off 
    //if the clickedCountry is different from the current clickedCountry (can be empyt also) the new clickedCountry is set
    //if the same clickedCountry is clicked again you empty the clickedCountry so nothing is shown
    event.target[0].value!==clickedCountry ? setClickedCountry(event.target[0].value) : setClickedCountry('')
  }

  if (CountryFilter.length !== 1) {  
    // The filter results in exactly one country so prevent showing a clicked country cause that will resolve in endless rerendering
    const DataOfCountry = props.countries.find(country => country.name.official === clickedCountry)
    //console.log(DataOfCountry)
    if(typeof DataOfCountry !== 'undefined'){
      if(props.latlon[0] !== DataOfCountry.capitalInfo.latlng[0])
      {
        //console.log('Lat-lon has changed from ShowListCountries')
        props.setLatlon([DataOfCountry.capitalInfo.latlng[0],DataOfCountry.capitalInfo.latlng[1]])
      }
    }
  }

  const OneCountryData = ShowOneCountry(props.countries, clickedCountry, props.weather)

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