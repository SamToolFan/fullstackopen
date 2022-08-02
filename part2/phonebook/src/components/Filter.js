import React from 'react'

const Filter = (persons, filter) => persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

export default Filter