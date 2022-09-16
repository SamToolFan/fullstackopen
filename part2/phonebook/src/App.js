import { useState, useEffect } from 'react'
import personService from './services/persons'
import Findperson from './components/Findperson' 
import Showperson from './components/Showperson'
import Notification from './components/Notification'
import Filter from './components/Filter' 

const App = () => 
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter a name to add...')
  const [newNumber, setNewNumber] = useState('Enter a telephonenumber...')
  const [filterName, setFilter] = useState('')
  const [textMessage, setTextMessage] = useState([null, null])

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

      const Findresult = Findperson(persons, newName, newNumber) // Test whether the person + number or person to add is already in the array
      //console.log(Findresult)
      if (Findresult === 'update') {
          //Findresult is true so Yes is pressed when Name is found with a new number => Update the number
          //console.log('Update the person')
          const person = persons.find(person => person.name === newName)
          const updatedPerson = {...person, number: newNumber}
          //console.log(updatedPerson)

          personService
              .update(updatedPerson.id, updatedPerson)
              .then(returnedPerson => {
                  setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
                  setTextMessage(
                      [`Telephonenumber of '${newName}' is updated`, 'message']
                  )
                  setTimeout(() => {
                      setTextMessage([null, null])
                  }, 2000)
              })
              .catch(error => {
                  //console.log('fail')
                  //console.log(error.response.data.error)
                  //console.log(error)
                  if (error.response.status === 400) {
                      setTextMessage(
                        [`'${error.response.data.error}'`, 'error']
                      )
                  } else {
                      setTextMessage(
                        [`'${newName}' appears to have been removed earlier (or he/she magically disappeared)`, 'error']
                      )
                  }
                  setTimeout(() => {
                      setTextMessage([null, null])
                  }, 2000)
                  personService
                      .getAll()
                      .then(initialPersons => {
                          setPersons(initialPersons)
                      })
              })


          setFilter('')      //reset filter so an updated name is always shown
      }
      else if (Findresult !== 'exact match' && Findresult !== 'ignore') {
//          console.log('Add the person')
//          const ids = persons.map(person => person.id) // determine all ids in persons
//          console.log(ids)

          const nameObject = {        //Create a new object with the name to be added
            name: newName,
            number: newNumber
            //number: newNumber,
            //id: newid
            }

          personService
            .create(nameObject)
            .then(response => {
                //console.log('The response = '+JSON.stringify(response))
                nameObject.id = response.id
                //console.log('The created nameObject = '+JSON.stringify(nameObject))
                setPersons(persons.concat(nameObject))      //Concatenate the object to a complete new persons array and offer it to the appropriate State function
                //console.log(response, persons)
                setTextMessage(
                  [`'${newName}' is added to the telephonebook`, 'message']
                )
                setTimeout(() => {
                    setTextMessage([null, null])
                }, 5000)
                 setFilter('')      //reset filter so an added name is always shown
            })
          .catch(error => {
            // this is the way to access the error message
            //console.log(error.response.data.error)
            setTextMessage(
              [error.response.data.error, 'error']
          )
          setTimeout(() => {
              setTextMessage([null, null])
          }, 10000)
  })
      }
      else{
        // Findresult === 'exact match' so name and number combo are already there => do nothing
        // OR
        // Findresult === 'ignore' so No is pressed when Name is found with a new number => do nothing
        //console.log('Either you chose to Ignore the update for an existing person OR there was an Exact match')
      }
      setNewName('')     //reset the default value
      setNewNumber('')   //reset the default value
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

          setTextMessage(
              [`'${name}' is deleted from the telephonebook`, 'delmessage']
          )
          setTimeout(() => {
              setTextMessage([null, null])
          }, 5000)
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
          <Notification message={textMessage[0]} format={textMessage[1]} />
        <div>
          Search person: <input  value={filterName} onChange={handleFilter}/>
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameAdd} />
        </div>
        <br />
        <div>
          Number: <input value={newNumber} onChange={handleNumberAdd}/>
        </div>
        <br />
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