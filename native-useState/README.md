# State Management React | useState

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

---

## Before hooks ! :hook

Before the introduction of hooks (Before React 16.8), React components mainly relied on class components and lifecycle methods for managing state. However, functional components were stateless and didn't have access to features like `state`.

`useState` is one of the most commonly used hooks that allows you to add state to functional components without converting them into class components.


**Before React 16.8**, to manage state in a functional component, you would need to use class components and lifecycle methods. Here's an example of a counter using a class component:

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

export default Counter;

```
**After React 16.8** and the introduction of hooks, you can manage state in a functional component using useState. Here's the same counter example using useState:

```jsx 
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default Counter;

```

> Why we use `const` when declaring a state variable ?
The reason we use const when declaring a state variable with useState is because we are not directly reassigning the state variable itself. Instead, we are using the setCount function (provided by useState) to update the state.

With useState, the state variable (count in our example) is immutable, which means you cannot directly modify its value like you would with a regular variable declared using let or var. By using const, we ensure that we don't accidentally reassign the state variable directly, which could lead to unexpected behavior and bugs in our React components.