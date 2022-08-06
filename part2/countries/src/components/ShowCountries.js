import React from 'react'

const ShowCountries = (props) => 
{
  let Filter = []
  const maxcountries = 10
  //If a countries exact name is part of another countries name then use this find to assure when you type it exact it will find only this one
  // Since find in this case returns only the part of the object from name etc. I use a trick to use the filter which returns the complete object 
  // In order to use filter uniquely I use the offical name of the country ASSUMING that this is unique!
  const Findcountry = typeof props.countries.find(country => country.name.common.toLowerCase() === props.filter.toLowerCase())
  if (Findcountry !== 'undefined') // Test whether a country is an exact match
  {
    // window.aler`${props.filter} is unique`)
    const temp = props.countries.find(country => country.name.common.toLowerCase() === props.filter.toLowerCase())
    Filter = props.countries.filter(country => country.name.official.includes(temp.name.official))
  }
  else{
    Filter = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
  }

  // Filter now contains one or alle objects (countries)
  if(props.filter===''){
    return(   
        <div>
        </div>
    )
  }
  else if (Filter.length===1) {
    const languages = Filter[0].languages

    const planguage= []
    for (const key in Filter[0].languages) {
      planguage.push(languages[key])
    } 

    return(   
      <div>
        <>
          <h1>{Filter[0].name.common}</h1>
          Capital: {Filter[0].capital}<br />
          Area: {Filter[0].area} km2 <br />
          <p><span style={{fontWeight: 'bold', fontSize: 18}}>languages:</span> <br /></p>
          <ul>{planguage.map(language => <li key={language}>{language}</li>)}</ul>
          <img src={Filter[0].flags.png}></img>
         </>
      </div>
    )
  }
  else if (Filter.length>maxcountries) {
    return(   
      <div>
        <>
          More than {maxcountries} matches ({Filter.length}), specify another filter
        </>
      </div>
    )
  }
  else if(Filter.length===0){
    return(   
        <div>
          <>
            No countries found
          </>
        </div>
    )
  }
  else{
    return(   
        <div>
          <>
            {Filter.map(country => <p key={country.flags.png}>{country.name.common}<br /> Capital: {country.capital}</p>)}
          </>
        </div>
    )
  }
}

export default ShowCountries