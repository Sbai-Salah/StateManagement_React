import './App.css'
import { useState } from 'react'

//6 Now let's try it with lists
function NameList(){
  const [list, setList] = useState(["A", "B", "C"]);
  const [name, setName] = useState("");


  const onAddName = () => {

    //10 and we can just comment this push here.
    //list.push(name); 

    /*7
    When typing something in the input field and press ADD nothing will happen
    but if we change the state (delete the field input) 
      
      - we will get a re-render for the list component and the entered item will be added to the list
      - the setName get called for that
      - the setName does two things : 1/ sets the name 2/ in queuses a re-render request for this component
      --> this is the difference between scallers (numbers) and references (objects and arrays)
      - we have the list (as an array passed by reference so we have the actual list used)
      - then we use the in-place method (push) to mutate the list in place.
      - if we refrech we still git the updated data.
    */

    //8 if we try this nothing will happen because any setter compares the old and new passed data, and if 
    //   it's the same it does nothing

    // setList(list); 

    //9 to solve this we pass the old data + the new added data like this :
    setList([...list, name]);
    setName(""); // to empty the field of the input after the re-rendering.
  };

  return (
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      <button
        onClick={onAddName}
      >Add Name</button>
    </div>
  );
}

///0 this function was originaly called App method
function Counter() {

  const [count, setCount] = useState(10);

  function addOne(){
    //1 count++; // count++;    Error : Assignment to constant variable
             //2 if we change the const of the useState to let we don't get error, because a const variable's value cannot be reassigned or changed after it is initially assigned  
  ////////3 TO MAKE IT WORK ///////
  setCount(count + 1);
}

  return (
    <div className="App">
      <button 
        onClick={addOne}
      >Count = {count}</button>
    </div>
  )
}



//4 What if we had multiple counters : to do this we will change the above App method to Counter 
//4 and create an APP method bellow to call multiple counters
//4 to see if the counters are coupled or not ... 
function App(){


  return (
    <>
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <NameList/>
     
    </>
    //5 the counters are independent
    //5 the state is being coupled with the instance of the component (Counter in this case)
  )
}


export default App