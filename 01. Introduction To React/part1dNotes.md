# A More Complex State, Debugging React Apps

## A Note On React Version
- Version 18 of React came out late March 2022.
- Code here should work with new React version.
- Some libraries are not yet compatible (like part 8 `Apollo` client).
    - Then downgrade to the older React by changing `package.json`:
```json
{
    "dependencies": {
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-scripts": "5.0.0",
        "web-vitals": "^2.1.4"
    },
    // ...
}
```
- After the changes, run `npm install` to reinstall dependencies.
- Also note that `index.js` needs to be changed a bit.
- React 18 is like this:
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
- React 17 is:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```


