import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas" }
    ]);
    const [newName, setNewName] = useState('');

    const addPerson = (event) => {

    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>debug: {newName}</div>
                <div>
                    name: <input />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    );
};

export default App;