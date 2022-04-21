import { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1234567", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
    ]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterPerson, setFilterPerson] = useState('');

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
            alert(`${newName} is already added to the phonebook!`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            };

            setPersons(persons.concat(personObject));
        }

        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterPerson = (event) => {
        setFilterPerson(event.target.value);
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filterPerson.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterPerson} changeHandler={handleFilterPerson} />

            <h3>Add New Person</h3>
            <PersonForm
                submitHandler={addPerson}
                newNameVal={newName}
                newNumVal={newNumber}
                nameChangeHandler={handleNameChange}
                numChangeHandler={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;