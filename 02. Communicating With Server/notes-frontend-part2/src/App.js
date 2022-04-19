const App = (props) => {
    const { notes } = props;

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note =>
                    <li>
                        {note.content}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default App;