# Rendering A Collection, Modules
- Recap difficult topics.


## console.log
- Logging to the console is good practice!


## Protip: Visual Studio Code Snippets
- Can create `snippets` or shortcuts for generating reusable code quickly.
- Instructions are here: `https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets`
- Can also use readymade plugins.
- Most important is the `console.log()` snippet, `clog`.
```
{
    "console.log" {
        "prefix": "clog",
        "body": [
            "console.log('$1')"
        ],
        "description": "Log output to console"
    }
}
```
- VSCode has a built-in one.
    - Type `log` and press tab to autocomplete.


## JavaScript Arrays
- Using methods of JS arrays like `find`, `filter`, and `map`.
- Watch first three parts of Functional Programming in JS: `https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84`
    - Specifically watch for `Higher-order functions`, `Map`, and `Reduce basics`.


## Event Handlers Revisited
- Review event handlers from part 1.


## Rendering Collections
- We will now do the `frontend` or browser-side logic in React.
- Start with `App`:
```javascript
const App = (props) => {
    const { notes } = props;

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                <li>{notes[0].content}</li>
                <li>{notes[1].content}</li>
                <li>{notes[2].content}</li>
            </ul>
        </div>
    );
};

export default App;
```
- The `index.js` file is:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
];

ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
);
```
- Each note has a content and a date timestamp and a boolean for important with a unique id.
- Works above because there are 3 notes.
- Access notes in the array with the index and bracket.
    - This is not practical.
    - Improve this by generating React elements from the array objects using `map` function.
```javascript
notes.map(note => <li>{note.content}</li>);
```
- The result is an array of `li` elements:
```javascript
[
    <li>HTML is easy</li>,
    <li>Browser can execute only JavaScript</li>,
    <li>GET and POST are the most important methods of HTTP protocols</li>
]
```
- Can place inside the `ul` tags:
```javascript
const App = (props) => {
    const { notes } = props;

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => <li>{note.content}</li>)}
            </ul>
        </div>
    );
};

export default App;
```
- Code generating the `li` tags is JS, so it must be in curly braces in the JSX template.
- Make more readable:
```javascript
const App = (props) => {
    const { notes } = props;

    return (
        <div>
            <h1>Notes</h1>
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
```


