import React from 'react'
import ShowOneCountry from './ShowOneCountry'

const FilterCountries = (props) => 
{
  if (props.FilterName === '') // No filter set yet
    return(   
      <div>
      </div>
    )

  const CountryFilter = props.countries.filter(country => country.name.common.toLowerCase().includes(props.FilterName.toLowerCase()))
    
  //console.log('Countryfilter',CountryFilter)

  if (CountryFilter.length === 0) { // The filter results in no countries found
    //console.log("0")
    return(
      <div>
        <>
          No countries found
        </>
      </div>
    )
  }
  else if (CountryFilter.length === 1) {  // The filter results in exactly one country
    //console.log("1",CountryFilter)

    if(props.latlon[0] !== CountryFilter[0].capitalInfo.latlng[0])
    {
      props.setLatlon([CountryFilter[0].capitalInfo.latlng[0],CountryFilter[0].capitalInfo.latlng[1]])
    }

    const OneCountryData = ShowOneCountry(props.countries, CountryFilter[0].name.official, props.weather)
return(   
      <div>
        <>
          {OneCountryData}
        </>
      </div>
    )
  }
  else if (CountryFilter.length <= props.maxcountries) { // The filter results in less than maxcountries found (could be an exact match in it though)
    //console.log("<= maxcountries")
    const Findcountry = typeof CountryFilter.find(country => country.name.common.toLowerCase() === props.FilterName.toLowerCase())
    //console.log(Findcountry)
    //If Findcountry is not 'undefined' then more than one country is found
    if (Findcountry !== 'undefined') // Test whether a country is an exact match
      {
        //window.alert(`${props.filter} is unique`)
        const temp = props.countries.find(country => country.name.common.toLowerCase() === props.FilterName.toLowerCase())

        if(props.latlon[0] !== temp.capitalInfo.latlng[0])
        {
          props.latlon[0]=temp.capitalInfo.latlng[0]
          props.latlon[1]=temp.capitalInfo.latlng[1]
          props.setLatlon([temp.capitalInfo.latlng[0],temp.capitalInfo.latlng[1]])
        }

        const OneCountryData = ShowOneCountry(props.countries, temp.name.official, props.weather)
        //console.log(OneCountryData)
        
        return(   
          <div>
            <>
            {OneCountryData}
            </>
          </div>
        )
      }
    else // Deze optie waarbij er dus een rijtje landen getoond kan worden wordt gehandled vanuit ShowListCountries
      { 
        return('')
      }
  }
  else { // The Filter has resulted in more than the maximum countries
    //console.log("> maxcountries")
    return(   
        <div>
          <>
            More than {props.maxcountries} matches ({CountryFilter.length}), specify another filter
          </>
        </div>
      )
  }
}

export default FilterCountries