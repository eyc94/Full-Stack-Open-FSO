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


## Loading a Page Containing JavaScript - Review
- Review what happens when page `https://studies.cs.helsinki.fi/exampleapp/notes` is opened.
    1. Browser fetches the HTML code using HTTP GET request.
    2. Links in HTML code makes browser fetch CSS style sheet.
    3. Also gets JS code file.
    4. Browser executes JS code.
    5. Code makes HTTP GET request to `/data.json` which returns notes as JSON data.
    6. When data is fetched, browser executes an `event handler` that renders the notes to the page using the DOM-API.


## Forms and HTTP POST
- Adding new note.
- The notes page has a `form` element.
- When button on form is clicked, the browser will send the user input to the server.
    - Open `Network` tab and see what it looks like.
- Submitting a form causes about 5 HTTP requests.
- Look at the first `new_note` event name.
    - Notice it's a POST request.
    - Status is 302.
    - This is a URL redirect which the server asks the browser to do a new HTTP GET request to the header's `Location`.
- Browser reloads the Notes page.
    - The reload causes three more HTTP requests:
        - Fetching the style sheet.
        - Fetching the JS code.
        - Fetching the raw JSON data.
- Look at `Payload` tab to see the `Form Data` that is submitted with the form.
- `Form` tag has attributes `action` and `method`.
    - Basically says that submitting the form is done as an HTTP POST request to the address `new_note`.
- Code on server handles POST request:
    - This is code on server, not JS code retrieved by browser.
```javascript
app.post('/new_note', (req, res) => {
    notes.push({
        content: req.body.note,
        date: new Date()
    });

    return res.redirect('/notes');
});
```
- Data is sent as `body` of the POST request.
    - Server can access data by using `req.body` field of the `req` request object.
    - Server creates new note object and adds to an array called `notes`.
- The Note objects have two fields:
    1. `content` contains the actual content of the note.
    2. `date` contains the date and time the note was created.
- Server does not save the new note to a database, so notes disappear after server restarts.


## AJAX
- The app uses Ajax which is an old way of doing things.
- `AJAX`, or `Asynchronous JavaScript and XML`, describes a new revolutionary way that allowed fetching of content to web pages using JavaScript included within the HTML, without needing to rerender the page.
    - Prior to AJAX, data was fetched with HTML code generated by server.
- The Notes page uses AJAX to fetch the notes data.
    - Submitting form done with traditional form submission.
- The URLs we worked with (lengthy ones) are not recommended.
    - They are not RESTful.


## Single Page App
- Home page is like a traditional web-page.
    - Browser renders the HTML.
    - Server has logic.
- The notes page tells the browser to generate HTML code for existing notes.
    - Browser does this by running the JS code it fetched from server.
    - The code gets the notes from the server as JSON data.
    - It then adds the HTML elements for displaying the notes to the page using DOM-API.
- `Single-Page Application (SPA)` style of creating web-apps has emerged.
    - They don't fetch all their pages separately from the server like the sample app.
    - It comprises one HTML page fetched from the server.
        - The contents are manipulated with JS that runs in the browser.
- The current Notes page resembles SPA, but not quite.
    - Logic for rendering notes is run on the browser.
    - Still uses the traditional way of adding new notes.
    - Data is sent to server with form submit.
    - The server then tells the browser to reload the Notes page with a `redirect`.
- The SPA version is `https://studies.cs.helsinki.fi/exampleapp/spa`.
    - Looks the same.
    - HTML is code is almost identical, but the JS is different `spa.js`.
    - There is a small change in how the form-tag is defined.
        - the `form` element has no `action` or `method` attribute to tell how and where to send input data.
    - Open the `Network` tab and empty it.
    - Add a new note and notice how the browser sends one request to the server.
        - The POST request contains the new note as JSON data that has both the content of the note, `content`, and the timestamp, `date`.
    - The `Content-Type` request header tells server that the included data in is JSON.
        - Without it, server has no idea how to properly parse the data.
    - Server responds with status code 201 created.
        - This time server does not ask for a redirect and browser stays on the same page.
        - Does not send anymore HTTP requests.
- The SPA version uses the JS code it got from the server to send send data.
```javascript
var form = document.getElementById('notes_form');
form.onSubmit = function(e) {
    e.preventDefault();

    var note = {
        content: e.target.elements[0].value,
        date: new Date()
    };

    notes.push(note);
    e.target.elements[0].value = '';
    redrawNotes();
    sendToServer(note);
};
```
- The code above gets the `form` element by id.
    - Sets an event handler for a submit event.
    - Event handler calls the method `e.preventDefault()` to prevent default handling of form submit.
    - The default method would send data to server and cause a new GET request.
        - Don't want this to happen!
- The event handler creates a new note.
- Then adds the note to a list of notes.
- Rerenders the note list on the page and sends new note to the server.
- Code for sending note to the server is:
```javascript
var sendToServer = function(note) {
    var xhttpForPost = new XMLHttpRequest();
    // ...

    xhttpForPost.open('POST', '/new_note_spa', true);
    xhttpForPost.setRequestHeader(
        'Content-type', 'application/json'
    );
    xhttpForPost.send(JSON.stringify(note));
};
```
- The code above says the data is sent with an HTTP POST request and as JSON.
    - Data type determined by `Content-Type` header.
    - Data is then sent as a JSON-string.


