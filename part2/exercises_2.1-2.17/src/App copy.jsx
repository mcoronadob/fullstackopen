import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('');

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existName = persons.some(p => p.name === newName);
    const existeNumber = persons.some(p => p.number === newNumber);

    if (!existName || !existeNumber) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
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

  const Persons = ({ person }) => {
    return <li>{person.name}  {person.number}</li>
  }

  const resultados = persons.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with: <input 
        value={query} 
        onChange={handlequeryChange}
      />

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameChange}
          /><br/>
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {resultados.map((person) => (
            <Persons key={person.number} person={person} />
          ))}
        </ul>
    </div>
  )
}

export default App
