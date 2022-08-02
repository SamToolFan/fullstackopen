import React from 'react'
import Filter from './Filter' 

const Showpersons = (props) => 
    <> 
      {Filter(props.persons, props.filter).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>

export default Showpersons