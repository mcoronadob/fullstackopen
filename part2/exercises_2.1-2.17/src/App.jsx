import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notificacion'
import ErrorMessage from './components/ErrorMessage.jsx'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('');
  const [person, setPerson] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPerson(initialPersons)
    })
  }, [])
  // console.log(person)

  const addPerson = (event) => {
    event.preventDefault()
    const existName = person.find((n) => n.name === newName)

    if(!existName){
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personsService.create(personObject).then((returnedPerson) => {
        setPerson(person.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }else{
      if (window.confirm(`${existName.name} is already added to phonebook, replace the old number 
        with the new one`)) {
        const changedNumber = { ...existName, number: newNumber }

        personsService
        .update(existName.id, changedNumber)
        .then((returnedPerson) => {
          setPerson(person.map((personU) => (personU.id !== existName.id ? personU : returnedPerson)))
        }).catch(error => {
          setErrorMessage(
            `Information of '${existName.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPerson(person.filter(p => p.id !== existName.id))
      })
      }
    }
    
  }

  // const changeNumber = (personU) => {
  //   const id = personU.id
  //   const note = person.find((n) => n.id === id)
  //   const changedNote = { ...note, important: !note.important }
  
  //   noteService
  //     .update(id, changedNote)
  //     .then((returnedNote) => {
  //       setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
  //     })
  //     .catch((error) => {
  //       alert(`the note '${note.content}' was already deleted from server`)
  //       setNotes(notes.filter((n) => n.id !== id))
  //     })
  // }

  const deletePerson = (personsD) => {
    if (window.confirm(`Delete ${personsD.name}`)) {
      personsService.remove(personsD.id).then((returnedId) => {
      setPerson(person.filter(p => p.id !== returnedId))
    })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

    const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlequeryChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const resultados = person.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}/>

      filter shown with: 
      <Filter query={query} handlequeryChange={handlequeryChange} />

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h2>Numbers</h2>
        <ul>
          {resultados.map((person) => (
            <Persons key={person.id} person={person} 
              deletePerson={() => deletePerson(person)}
              // changeNumber={() => changeNumber(person)}
            />
          ))}
        </ul>
    </div>
  )
}

export default App
