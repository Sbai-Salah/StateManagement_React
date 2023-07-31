# State Management React | useReducer

`useReducer` is a React hook that provides an alternative way to manage complex state logic in your components. It is typically used when the state transitions are more complex and involve multiple sub-states that are interrelated. It's similar to useState, but instead of having separate state variables and setters, it combines the state and its update logic into a single function.

## Here's how useReducer works:

**Initialization** : The useReducer hook takes two arguments

```
const [state, dispatch] = useReducer( (1), (2) );

```


(1) a reducer function :  takes two arguments

    - The current state 
    - and an action object: this object typically has a type property, which is used to identify the type of action to be performed, and an optional payload property that can contain additional data needed to update the state.

(2) the initial state. In our example, the initial state is an object with two properties: names (an array) and name (a string).

```
<input type="text" value={state.name} onChange={e => dispatch({type: "SET_NAME", payload: e.target.value})}/>

```

**Dispatch Function** : The useReducer hook returns an array with two elements.

[1] The first element (state)  represents the current state.

[2] and the second element (dispatch) is a function used to dispatch actions to update the state. When you call dispatch, it triggers the execution of the (1) reducer function, which takes the current state and the action as input and returns the updated state.


**Rendering and Updating** : After the state is updated, React will re-render the component with the updated state. In our example, the input field's value is directly linked to `state.name`, and when you type in the input, it dispatches the "SET_NAME" action, which updates the name property in the state.

## Examples where we can use the useReducer : 

**Implementing Undo/Redo Functionality**: For implementing undo/redo functionality in an editor or application, useReducer can be useful in managing the history of state changes.
>>> Check the code for this example


**Server-Side Data Handling**: When fetching data from a server and handling different states like loading, error, and success, useReducer can provide a structured way to manage these states.
>>> Here's an implementation of this example : 

```jsx

import React, { useEffect, useReducer } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function DataFetcher() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulating API call
    dispatch({ type: 'FETCH_START' });
    fetchDataFromServer()
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCH_ERROR', payload: error.message }));
  }, []);

  const fetchDataFromServer = () => {
    return new Promise((resolve, reject) => {
      // Simulating an API call delay
      setTimeout(() => {
        const randomValue = Math.random();
        if (randomValue < 0.7) {
          resolve('Data successfully fetched from the server!');
        } else {
          reject(new Error('Error fetching data from the server!'));
        }
      }, 1000);
    });
  };

  const { data, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Data: {data}</div>;
}

export default DataFetcher;

```
