import { useState } from 'react'

const Showpersons = ({persons}) => 
  <> 
    {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </>


const App = () => 
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])

  const [newName, setNewName] = useState('Enter a name to add...')
  const [newNumber, setNewNumber] = useState('Enter a telephonenumber...')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Showpersons persons={persons}/>
    </div>
  )
}

export default App