import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
import Findperson from './components/Findperson' 
import Showperson from './components/Showperson' 
import Filter from './components/Filter' 

const App = () => 
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter a name to add...')
  const [newNumber, setNewNumber] = useState('Enter a telephonenumber...')
  const [filterName, setFilter] = useState('')

  useEffect(() => {
    //console.log('effect persons')
      personService
          .getAll()
          .then(initialPersons => {
              setPersons(initialPersons)
          })
  }, [])
  //console.log('render', persons.length, 'persons')

  const addName = (event) =>    //This function is executed when the button is pressed (and the new name is submitted)
  {
    event.preventDefault()      //To prevent usual onSubmit handling and take over control
      if (Findperson(persons, newName) !== 'undefined') { // Test whether the person to add is already in the array
        window.alert(`${newName} is already in the phonebook`)
      }
      else {
        // Because I need the ID in order to be able to build the right delete button for a just added person 
        // I will determine it myself instead of having axios/json call do that because just the axios/json call will not upate the persons state array of course
        // By determining the ID myself I can update the persons array properly
        const ids = persons.map(person => person.id) // determine all ids in persons
        //console.log(ids)
        const maxid = Math.max(...ids) // determine the highest id in persons

        const nameObject = {        //Create a new object with the name to be added
          name: newName,
          number: newNumber,
          id: maxid+1
        }

        personService
            .create(nameObject)
            .then(response => {
                setPersons(persons.concat(nameObject))      //Concatenate the object to a complete new persons array and offer it to the appropriate State function
                //console.log(response, persons)
                setNewName('')     //reset the default value
                setNewNumber('')   //reset the default value
                setFilter('')      //reset filter so an added name is always shown
            })
    }
  }

  const deletePerson = (id, name) => {
      //console.log('delete ' + id)
      if (window.confirm(`Do you really want to delete ${name}?`)) {
          //window.alert(`Deleting ${name}!`)
          personService
              .delitem(id)
              .then(response => {
                  //console.log(response)
                  setPersons(persons => persons.filter(person => person.id !== id))      //Delete the deleted person from the State
              })
      }
      else {
          window.alert(`Ok ${name} stays!`)
      }
  }

  // Handling the input - Everytime a character changes in the input field this onChange function is called (so everykeystroke I guess)
  // This function takes the event and takes the value of event and use the State function to change its variable newName to the value of event
  const handleNameAdd = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberAdd = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          Search person: <input  value={filterName} onChange={handleFilter}/>
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameAdd} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
          <h2>Numbers</h2>
          {Filter(persons, filterName).map(person =>
              <Showperson
                  key={person.id}
                  name={person.name}
                  number={person.number}
                  deleteAperson={() => deletePerson(person.id, person.name) }
              />
          )}
    </div>
  )
}

export default App