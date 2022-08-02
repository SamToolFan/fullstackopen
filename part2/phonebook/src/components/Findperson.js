import React from 'react'

const Findperson = (persons, newName) => typeof persons.find(person => person.name === newName)

export default Findperson