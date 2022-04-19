const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    );
};

const App = ({ notes }) => {

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