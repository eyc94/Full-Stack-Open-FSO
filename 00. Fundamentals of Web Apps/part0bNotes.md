# Fundamentals of Web Apps
- The example used is `studies.cs.helsinki.fi/exampleapp/`.
- Open the Developer Console.
    - Use `Network` tab to view the requests.
    - Check the `Disable cache` and `Preserve log` checkboxes.


## HTTP GET
- Browser and server communicate via HTTP protocol.
- `Network` tab shows how the browser and server communicate.
- Reloading browser causes contents of page to be fetched and png image downloaded.
- Look at `Headers`.
    - `General` 
        - Shows the request URL.
        - Shows status code 200 (successful).
    - There is also the `Response Headers` from the server and the `Request Headers` from the client.
        - Shows the size of response in bytes.
        - Shows time of response.
        - Shows the `Content-Type` which tells us the response is a text file in utf-8-format.
            - Formatted with HTML.
            - Browser knows the response to be a regular HTML page.
- The `Response` tab.
    - Shows response data (HTML page).
    - The page shows a `div` tag, an `h1` header, a `p` tag that shows number of notes, an `a` tag for the link, and an `img` tag for the image.
- The browser does another HTTP request to get the png image from server.
- The following is a sequence diagram (flow):
    1. Browser sends HTTP GET request to the server to get HTML code of page.
    2. The server responds with HTML code passed back to browser.
    3. The browser sends HTTP get request to server to get png.
    4. The server responds with the png image.


## Traditional Web Applications
- When entering page, browser fetches the HTML document from server.
    - The document can be static from the server's directory.
    - It can also be dynamic.
        - Formed according to application code with data from a database.
- The example app is formed dynamically because of the number of notes it displays.
- HTML code of homepage is:
```javascript
const getFrontPageHtml = (noteCount) => {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                <div class='container'>
                    <h1>Full stack example app</h1>
                    <p>number of notes created ${noteCount}</p>
                    <a href='/notes'>notes</a>
                    <img src='kuva.png' width='200' />
                </div>
            </body>
        </html>
    `);
};

app.get('/', (req, res) => {
    const page = getFrontPageHtml(notes.length);
    res.send(page);
});
```
- Notice above that the HTML page is saved as a template string.
    - The dynamic part is the `noteCount` variable.
- Writing HTML in the middle of code is not smart.
    - Standard for old-school PHP programmers.
- In traditional web apps, the browser is "dumb".
    - Fetches HTML from the server.
    - All app logic is on the server.
    - Server can be created using Java Spring, Python Flask, or Ruby on Rails.
- Example uses `Express` from `Node.js`.
    - This course uses `Express` and `Node.js` to create web servers.


## Running Application Logic In The Browser
- Keep dev console open.
- Click the cancel symbol in the top left.
    - Or type `clear()` in the console to clear the console.
- Go to the notes page, and the browser does 4 HTTP requests.
    - Notice all requests have different types.
        - Document, stylesheet, script, xhr.
- Looking at the `notes` document, the HTML code does not contain the list of notes.
    - There is a script tag.
    - This script tag fetches the JS file called `main.js`.
- The JS code looks like this:
```javascript
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        console.log(data);

        var ul = document.createElement('ul');
        ul.setAttribute('class', 'notes');

        data.forEach(function(note) {
            var li = document.createElement('li');

            ul.appendChild(li);
            li.appendChild(document.createTextNode(note.content));
        });

        document.getElementById('notes').appendChild(ul);
    }
};

xhttp.open('GET', '/data.json', true);
xhttp.send();
```
- This code is not relevant to the coding techniques of the course.
    - We will return to modern ways of making requests to the server in part 2.
- Browser executes code after fetching JS.
- The last two lines tell the browser to do an HTTP GET request to the server's address `/data.json`.
- Go to `https://studies.cs.helsinki.fi/exampleapp/data.json`.
    - See raw json data.
    - Need JSON formatting plugin to see it nicely formatted.
- JS code downloaded the json data and forms a bullet-point list with it.
- Code creates an unordered list with a `ul` tag.
    - It then adds an `li` tag for each note.
    - Only the content of the note becomes the content of the `li` tag.
- Go to the dev console in the `Console` tab.
    - You can expand the 100 printed json data and view each one of them.


## Event Handlers and Callback Functions
- Structure of the JS code is strange.
- The request to the server is actually sent at the way bottom, but the code to handle the response is found way up.
- An `event handler` for the event `onreadystatechange` is defined for `xhttp` object doing request.
    - When the state of this object changes, the browser calls the event handler function.
    - The code checks that `readyState` is 4 (operation complete) and HTTP status code is 200.
- Event handler functions are called `callback` functions.
    - The app code does not call the functions.
    - The runtime environment (browser) calls them when appropriate (when the event occurs).


## Document Object Model or DOM
- HTML pages are implicit tree structures.
    - Can also go to the `Elements` tab to see a tree-like structure.
- Functioning of browser is based on idea of depicting HTML elements as a tree.
- `Document Object Model`, or `DOM`, is an `Application Programming Interface (API)` that allows modification of element trees of web pages.
- The JS code above created a `ul` element and append the creation of an `li` element.
    - Done using DOM.
- The `ul` is then appended to the proper place in the HTML tree.


## Manipulating The Document-Object From Console
- Topmost node is `document` object.
    - Type `document` in the console to access this object.
- Add new note to the page using the console.
- Get the list of notes from the page.
    - The list is in the first `ul` element of the page.
```javascript
list = document.getElementsByTagName('ul')[0];
```
- Create a new `li` element and add some text content to it:
```javascript
newElement = document.createElement('li');
newElement.textContent = 'Page manipulation from console is easy';
```
- Add new `li` to the list:
```javascript
list.appendChild(newElement);
```
- This adds the new note to the bottom of the list.
    - Changes are not permanent.
    - Gone after refreshing.
    - Changes not pushed to server.
- The JS code that is fetched by the browser will always create the list of notes based on JSON-data from `https://studies.cs.helsinki.fi/exampleapp/data.json`.


## CSS
- `head` element of HTML code of notes page has a `link` tag.
    - Fetch `CSS` style sheet from the address `main.css`.
- `Cascading Style Sheets` or `CSS` is a style sheet language used for styling a page.
- The `CSS` file looks like so:
```css
.container {
    padding: 10px;
    border: 1px solid;
}

.notes {
    color: blue;
}
```
- There are two `class selectors`.
    - Styles certain parts of the page depending on the rules.
    - Starts with period and has the name of the class.
    - Classes are attributes added to HTML elements.
    - CSS attributes can be shown on the `Elements` tab in the console.
- Outermost `div` element is of class `container`.
    - This is a 1px wide border.
    - It sets a 10px `padding` on the element.
- The `ul` element with list of notes is of class `notes`.
    - Sets the color of the notes to blue.
- There are other attributes like `id`.
    - JS code uses `id` to find element.
- Changes made on console is not permanent.

