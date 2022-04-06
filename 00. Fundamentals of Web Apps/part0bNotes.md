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


