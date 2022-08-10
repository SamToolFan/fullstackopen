import React from 'react'

const ShowOneCountry = (countries, Officialname) => 
{
  //console.log(countries)
  //console.log(Officialname)
  // Find the country provided
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
 
    return (
      <>
        <h1>{OneCountryData.name.common}</h1>
        Official Name: {OneCountryData.name.official}<br />
        Capital: {OneCountryData.capital}<br />
        Area: {OneCountryData.area} km2 <br />
        <p><span style={{fontWeight: 'bold', fontSize: 18}}>languages:</span> <br /></p>
        <ul>{planguage.map(language => <li key={language}>{language}</li>)}</ul>
        <img src={OneCountryData.flags.png}></img>
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