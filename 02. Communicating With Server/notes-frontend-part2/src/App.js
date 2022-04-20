import { useState } from 'react';
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
        </div>
    );
};

export default App;