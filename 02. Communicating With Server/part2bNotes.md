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


## Controlled Component
- Access form data from input element from `controlled components`.
- Add new piece of state called `newNote` to store user-submitted input.
    - Set it as input element's `value` attribute.
```javascript
const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(
        'a new note...'
    );

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
                <input value={newNote} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- The `newNote` state's placeholder text appears in input element.
    - Cannot be edited.
    - Console gives warning saying we gave a `value` without an `onChange` handler.
        - Renders a 'read-only' field.
- The `App` component controls behavior of input element because piece of state was assigned to value of input element.
- To allow editing, we need to assign an `event handler` that synchronizes the changes made to input with the state.
```javascript
const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(
        'a new note...'
    );

    // ...

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
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
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- Event handler called on every change of the input element.
    - Receives event object as `event` parameter.
    - `target` is now the controlled input element.
    - `event.target.value` refers to the value of the input element.
- No call to `event.preventDefault()` is required.
    - No default action occurs on input change.
    - Follow along in console.
- `App` component's `newNote` state shows current value of input.
    - Complete `addNote` function:
```javascript
const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(
        'a new note...'
    );

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        };

        setNotes(notes.concat(noteObject));
        setNewNote('');
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
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
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- First, create new `noteObject`.
    - The content is received from `newNote` state.
- New note is added to list of notes using `concat()`.
    - Never mutate state directly!!
- Resets the value of input.


## Filtering Displayed Elements
- How to view only important notes.
- Add piece of state to `App` that keeps track of which notes should be shown.
```javascript
const App = (props) => {
    const [notes, setNotes] = useState(prop.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // ...
};
```
- Store list of notes to show in the `notesToShow` variable.
    - Items of list depend on state of component.
```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // ...
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- The `notesToShow` variable uses `conditional` operator.
    - Can simplify like shown:
```javascript
notes.filter(note => note.important);
```
- Test filtering by changing value of `showAll` state.
- Add functionality that allows user to toggle the `showAll` state of app from UI.
```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // ...

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
};
```
- The display is controlled by a button.
- Event handler is simple, so it is defined inline.


