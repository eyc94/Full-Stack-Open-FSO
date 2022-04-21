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


