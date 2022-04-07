# Introduction to React
- We now start with the most important topic, `React` library.
- Make a simple React app and we'll get to know more about the core concepts of React.
- Easiest way is to use a tool called `create-react-app`.
- Create an app called `part1`.
```
npx create-react-app part1
cd part1
```
- Run app like so:
```
npm start
```
- By default, app runs in localhost port 3000 with address `http://localhost:3000`.
    - Browser launches automatically.
    - Open browser console.
    - Also, open a text editor.
- Code of app is in `src` folder.
- Simplify code in `index.js`:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
- The file `App.js` looks like this:
```javascript
const App = () => (
    <div>
        <p>Hello world</p>
    </div>
);

export default App;
```
- Files `App.css`, `App.test.js`, `index.css`, `logo.svg`, `setupTests.js` and `reportWebVitals.js` can be deleted.


