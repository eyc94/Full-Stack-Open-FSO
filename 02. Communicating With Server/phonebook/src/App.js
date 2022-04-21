import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas" }
    ]);
    const [newName, setNewName] = useState('');

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
            alert(`${newName} is already added to the phonebook!`)
        } else {
            const personObject = {
                name: newName
            };

            setPersons(persons.concat(personObject));
        }

        setNewName('');
    };

    const handlePersonChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    <div>Name: <input value={newName} onChange={handlePersonChange} /></div>
                    <div>Number: <input /></div>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person =>
                    <div key={person.name}>{person.name}</div>
                )}
            </div>
        </div>
    );
};

export default App;