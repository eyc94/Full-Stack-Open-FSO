# Component State, Event Handlers
- Start with a new example:
```javascript
const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    );
};

const App = () => {
    const name = "Peter";
    const age = 10;

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </div>
    );
};
```


## Component Helper Functions
- Expand `Hello` component so it guesses the year of birth of person being greeted:
```javascript
const Hello = (props) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        return yearNow - props.age;
    };

    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- Logic is in a separate function as you can see.
- Notice the function can directly access the `props` input.
- Notice also we define a function in a function, which is common in JS.


## Destructuring
- Can destructure values from objects upon assignment.
- We previously referenced data like `props.name` and `props.age`.
- We know `props` is an object.
```javascript
props = {
    name: "Arto Hellas",
    age: 35
};
```
- Can assign values of properties directly into variables `name` and `age`:
```javascript
const Hello = (props) => {
    const name = props.name;
    const age = props.age;

    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- Notice the compact form of the arrow function.
- Two function definitions below are the same:
```javascript
const bornYear = () => new Date().getFullYear() - age;

const bornYear = () => {
    return new Date().getFullYear() - age;
};
```
- Now we destructure:
```javascript
const Hello = (props) => {
    const { name, age } = props;
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- If the object has the values below:
```javascript
props = {
    name: "Arto Hellas",
    age: 35
};
```
- The expressions `const { name, age } = props` assigns "Arto Hellas" to `name` and 35 to `age`.
- Take destructuring a step further:
```javascript
const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};
```
- We destructure directly in the definition of the component.


