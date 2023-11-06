# React
- React.js is an open-source JavaScript library used for building user interfaces (UIs) and single-page applications.
- Allows developers to build reusable UI components that can be easily managed and manipulated, providing a faster and more efficient way to build interactive UIs
- React uses a virtual DOM (Document Object Model) and a declarative syntax to allow developers to describe how the UI should look at any given time
    - Updates the actual DOM only with the necessary changes, improving performance and reducing load times.
    - Offers a range of powerful features
        - state management
        - event handling
        - server-side rendering

### **JSX**
- JSX is a syntax extension for JavaScript that allows developers to write HTML-like syntax within their JavaScript code (easier to understand hierarchy of HTML structure later)
- JSX is not required to use React.js, but it has become the standard way of writing React components. (It is transpiled by tools like Babel to regular JavaScript before it can be run in the browser.)
- Here is an example of a simple React component written using JSX:

        import React from 'react';

        function Button(props) {
        return (
            <button onClick={props.onClick}>
                {props.label}
            </button>
        );
        }

        export default Button;

        // Code breakdown:
        We define a Button component using the function syntax
        Within the component function, we use JSX to define the button element that will be rendered to the DOM
        The props parameter is used to pass in data to the component, such as the button label and the onClick handler

### **Prop**
- `prop` (short for "property") is a way to pass data from a parent component to a child component
- `props` are **read-only**, which means that a child component cannot modify the props it receives from its parent (new props should be passed if updates are needed!)
    - If the child component needs to update its data based on user input or other events, it can do so by using `state`, which is a separate concept in React
- `props` are similar to function arguments:
    - They allow a component to be customized and configured for specific use cases

- Example of how props can be used in a React component:

        function Greeting(props) {
        return <h1>Hello, {props.name}!</h1>;
        }

        function App() {
        return (
            <div>
                <Greeting name="Alice" />
                <Greeting name="Bob" />
                <Greeting name="Charlie" />
            </div>
        );
        }

        // Code breakdown:
        "Greetings" component takes a "props" object as an argument, which contains a "name" property
        In the "App" component, we render three Greeting components with different name props

### **Component**
- a `component` is a reusable piece of UI that encapsulates the functionality and presentation of a portion of the user interface (eg. button or form)
- a `component` can include other components, and each can have their own `state` (can be updated and passed to it's children)
- `components` are created using either `classes` or `functions` (use latter, as that is the newer and also recommended for now, and also more lightweight and fast!)
- `components` can **accept** input data called `props` and can **return** visual elements in the form of HTML, JSX, or other components
- **lifecycle:** various stages of a component's existence, from its creation to its destruction:
    - Components can be mounted, updated, and unmounted, and various methods can be called at different stages of their lifecycle to perform tasks such as initialization, updating, or cleanup.

- Example of a React component:

        import React from 'react';

        function Greeting(props) {
        return (
            <div>
                <h1>Hello, {props.name}!</h1>
                <p>Welcome to React.</p>
            </div>
        );
        }

        export default Greeting;

        // Code breakdown:
        We have defined a functional component named "Greeting" that takes a single prop name
        It renders a simple greeting message that includes the name prop
        In the body of the component, we are returning a JSX expression that describes the structure of the output:
            This includes a div element that contains an h1 and a p element
            The h1 element includes an interpolated reference to the name prop, which is enclosed in curly braces.
        The component is then exported using the "export default" syntax, to use in other parts of our application.

- To use this `component` in another component or file, we simply import it like any other module (we use it twice with 2 different name props):

        import Greeting from './Greeting';

        function App() {
        return (
            <div>
                <Greeting name="Alice" />
                <Greeting name="Bob" />
            </div>
        );
        }

        export default App;

### **Event**