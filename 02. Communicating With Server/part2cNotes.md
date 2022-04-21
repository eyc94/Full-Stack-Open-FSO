# Getting Data From The Server
- We've been working on frontend functionality.
- We will now start working on backend.
    - Familiarize ourselves now with how code in the browser communicates with the backend.
- Use a tool to be used during software development called `JSON Server` to act as our server.
- Create a file called `db.json` in the root of the project:
```json
{
    "notes": [
        {
            "id": 1,
            "content": "HTML is easy",
            "date": "2022-1-17T17:30:31.098Z",
            "important": true
        },
        {
            "id": 2,
            "content": "Browser can execute only JavaScript",
            "date": "2022-1-17T18:39:34.091Z",
            "important": false
        },
        {
            "id": 3,
            "content": "GET and POST are the most important methods of HTTP protocol",
            "date": "2022-1-17T19:20:14.298Z",
            "important": true
        }
    ]
}
```
- Can install JSON server globally: `npm install -g json-server`
    - Need admin access.
    - Won't be doing this.
- From root, run `json-server` using command `npx`:
```
npx json-server --port 3001 --watch db.json
```
- `json-server` run on port 3000 by default, but app uses 3000.
- So assign it 3001.
- Go to the address `http://localhost:3001/notes` in the browser.
    - Shows the notes from the file.
- Idea is to save notes to the server (json-server).
    - React code fetches the notes from server.
    - Renders them to the screen.
    - New notes are sent to the server to make it persist in "memory".
- `json-server` stores data from `db.json`.
    - In the real world, data would be stored in a database.
    - `json-server` is a tool used during dev phase to enable server-side functionality without the need to program it.


## The Browser As A Runtime Environment
- First task is to fetch notes to our React app from `http://localhost:3001/notes`.
- In part 0, we went over how to fetch data from a server using JS.
    - This was done using `XMLHttpRequest`.
    - HTTP request made using an XHR object.
    - No longer recommended.
    - Browsers widely support `fetch` method based on `promises`.
- As a reminder, do not do the below:
```javascript
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        // Handle the response that is saved in variable data.
    }
};

xhttp.open('GET', '/data.json', true);
xhttp.send();
```
- In the beginning, event handler is registered to `xhttp` object representing the HTTP request.
    - Called by JS runtime when state of `xhttp` changes.
    - If change in state means response to request has arrived, handle accordingly.
- Code in event handler is defined before request is sent to server.
    - Code will execute at a later point in time.
    - Code does not execute `synchronously` (top to bottom) but does so `asynchronously`.
    - JS calls event handler at some later point.
- JS engines, or runtime environments, follow asynchronous model.
    - Requires all IO-operations to be run as non-blocking.
    - Non-blocking means that code execution continues immediately after calling an IO function without waiting for it to return.
- When async operation is done, or at some later point after it's done, the JS engine calls the event handler registered to the operation.
- JS engines are `single-threaded`.
    - Cannot execute code in parallel.
    - Thus, requirement to use a non-blocking model for running IO operations.
    - Else the browser would freeze during execution.
- Browser might get stuck during one execution.
- Nowadays you can run parallelized code with `web workers`.


## npm
- Get back to fetching data from the server.
- Can use `fetch`.
    - Standardized and supported by all modern browsers.
- Use `axios` library instead for communication between browser and server.
    - Like `fetch` but more pleasant to use.
    - Good for getting familiar with `npm packages`.
- All JS projects are defined using node package manager, or `npm`.
    - `create-react-app` projects also follow npm format.
    - Clear indicator is the `package.json` file.
```json
{
    "name": "notes",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@testing-library/jest-dom": "^5.16.4",
        "@testing-library/react": "^13.1.1",
        "@testing-library/user-event": "^13.5.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
}
```
- The `dependencies` section is most important to us right now.
    - This means external libraries.
- Install `axios`:
```
npm install axios
```
- Run the command in the root directory.
- `axios` should now be included.
```json
{
    "name": "notes-frontend-part2",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "@testing-library/jest-dom": "^5.16.4",
        "@testing-library/react": "^13.1.1",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^0.24.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
    }
}
```
- The command downloads dependencies inside `node_modules` folder.
- Let's install `json-server` as a development dependency.
```
npm install json-server --save-dev
```
- Make the following script:
```json
{
    // ...
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "server": "json-server -p3001 --watch db.json"
    }
}
```
- Can start json-server from root with:
```
npm run server
```
- Previously started server must be stopped before starting a new one.
- `axios` is a runtime dependency.
    - Execution of program requires existence of the library.
- `json-server` is a development dependency (`--save-dev`).
    - Program doesn't require it.
    - Assist in software development.


