import { useState } from 'react'

const Showpersons = ({persons}) => 
  <> 
    {persons.map(person => <p key={person.name}>{person.name}</p>)}
  </>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('Enter a name to add...')

  const addName = (event) => {  //This function is executed when the button is pressed (and the new name is submitted)
    event.preventDefault()      //To prevent usual onSubmit handling and take over control
    const nameObject = {        //Create a new object with the name to be added
      name: newName
    }
    
    setPersons(persons.concat(nameObject))      //Concatenate the object to a complete new persons array and offer it to the appropriate State function
    setNewName('Enter yet another name...')     //reset the default value - for fun not empty
  }

  // Everytime a character changes in the input field this onChange function is called 
  // This function takes the event and takes the value of event and use the State function to change its variable newName to the value of event
  const handleNameAdd = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameAdd} />
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