# Forms
- Allow users to add new notes.
- Update page when new notes are added.
    - Best to store notes in `App` component's state.
- Import `useState` and use it to define a state that is initialized to the notes that gets passed.
```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
        </div>
    );
};

export default App;
```
- The state is initialized to the notes that are passed as props to the `App` component.
- We can also initialize to an empty array like so:
```javascript
const App = () => {
    const [notes, setNotes] = useState([]);

    // ...
};
```
- Notice that the `props` is gone because we don't need the notes array anymore.
- Stick with the original way for now.
- Add an HTML form for adding new notes:
```javascript
const App = (props) => {
    const [notes, setNotes] = useState(props.notes);

    const addNote = (event) => {
        event.preventDefault();
        console.log('button clicked', event.target);
    };

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- The event handler for the form is `addNote` function.
    - Function is called when the form is submitted (save button clicked).
    - The `event` parameter is the event that triggered the call to the event handler function.
    - Prevents default action of submitting form.
        - Causing page to reload.
    - Target of the event in `event.target` is printed to console.
        - Target is the form.
- How to access data in form's input element?


