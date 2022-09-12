//import React from 'react'

const Findperson = (persons, newName, newNumber) => {
    const found = typeof persons.find(person => (person.name === newName && person.number === newNumber))
    const foundName = typeof persons.find(person => person.name === newName)

    if (found !== 'undefined') {
        window.alert(`${newName} with ${newNumber} is already in the phonebook`)
        return 'exact match'
    }
    else if (foundName !== 'undefined') {
        return (window.confirm(`${newName} is found but with other phonenumber. Do you want to replace the phonenumber`)) ?  'update' : 'ignore'
    }

    //return found
}


export default Findperson