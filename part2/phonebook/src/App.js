import { useState } from 'react'

const Filter = (persons, filter) => persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

const Showpersons = (props) => 
    <> 
      {Filter(props.persons, props.filter).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>

const App = () => 
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Sander van Waard', number: '45678298765' },
    { name: 'Marije Koekebacker', number: '98765432' },
    { name: 'Jan Jansen', number: '34567890' }
   ])

  const [newName, setNewName] = useState('Enter a name to add...')
  const [newNumber, setNewNumber] = useState('Enter a telephonenumber...')
  const [filterName, setFilter] = useState('')

  const addName = (event) =>    //This function is executed when the button is pressed (and the new name is submitted)
  {
    event.preventDefault()      //To prevent usual onSubmit handling and take over control
    
    if (typeof persons.find(person => person.name === newName) !== 'undefined') // Test whether the person to add is already in the array
      {
        window.alert(`${newName} is already in the phonebook`)
      }
    else 
      {
        const nameObject = {        //Create a new object with the name to be added
          name: newName,
          number: newNumber
        }
        
        setPersons(persons.concat(nameObject))      //Concatenate the object to a complete new persons array and offer it to the appropriate State function
  
        setNewName('')     //reset the default value
        setNewNumber('')     //reset the default value
        setFilter('')     //reset filter so an added name is always shown
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
          filter shown with: <input  value={filterName} onChange={handleFilter}/>
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
      <Showpersons persons={persons} filter={filterName}/>
    </div>
  )
}

export default App