import React from 'react'
import ShowWeather from './ShowWeather'


const ShowOneCountry = (countries, Officialname, weather) => 
{
  
  if (typeof countries.find(country => country.name.official === Officialname) !== 'undefined') 
  {
    const OneCountryData = countries.find(country => country.name.official === Officialname)
    //console.log(countries)
    //console.log(OneCountryData)

    const languages = OneCountryData.languages

    const planguage= []
    for (const key in OneCountryData.languages) {
      planguage.push(languages[key])
    } 


    // Don't get why the border is not shown around the image of the flag...
    const GoogleMaps = 'https://www.google.com/maps/place/'+OneCountryData.capitalInfo.latlng[0]+','+OneCountryData.capitalInfo.latlng[1]+'/@'+OneCountryData.capitalInfo.latlng[0]+','+OneCountryData.capitalInfo.latlng[1]+',9z'
    return (
      <>
        <h1>{OneCountryData.name.common}</h1>
        Official Name: {OneCountryData.name.official}<br />
        Capital: {OneCountryData.capital} <a target='new' href={GoogleMaps}>(See it on Google maps)</a><br />
        Area: {OneCountryData.area} km2 <br />
        <p><span style={{fontWeight: 'bold', fontSize: 18}}>Languages:</span> <br /></p>
        <ul>{planguage.map(language => <li key={language}>{language}</li>)}</ul>
        <p><span style={{fontWeight: 'bold', fontSize: 18}}>Weather in {OneCountryData.capital}:</span> <br /></p>
        <ShowWeather  lat={OneCountryData.capitalInfo.latlng[0]} lon={OneCountryData.capitalInfo.latlng[1]} weather={weather}/>
        <p><span style={{fontWeight: 'bold', fontSize: 18}}>Flag:</span> <br /></p>
        <img style={{height: 150, borderWidth: 1, borderColor: 'black'}} title={OneCountryData.name.common} alt={OneCountryData.name.common} src={OneCountryData.flags.png}></img>
       </>
    )
  }
  else{
    return (
      <>
      </>
    )
  }
}

export default ShowOneCountry