import { useRef, useEffect, useState } from 'react'
import './App.css'

function App() {
/////////////////////  1  /////////////////////////////
  const inputRef = useRef(null);
  //1 with this useEffect we can achive this : 
  // each time the page is loaded or the component is rendered.
  // we have a focus to the input field
  // to actually see the difference remove this useEffect.

  useEffect(()=>{
    inputRef.current.focus();
  }, [])
/////////////////////// 2  ///////////////////////////
const idRef = useRef(1);

const [names, setNames] = useState([
  {id: idRef.current++, name : "Salah"},
  {id: idRef.current++, name : "Khadija"}
]);
const onAddName = ()=>{
  setNames([...names, {id: idRef.current++, name: inputRef.current.value},]);
  inputRef.current.value = "";
  
};


  return (
  <div>
    <hr />
    <input type="text" ref={inputRef} />
    {/* This code bellow is for 2 */}
    <button onClick={onAddName}>ADD NAME</button>
    <h4>LIST OF NAMES ENTERED: </h4>
    <div>
      {names.map((obg)=>
       ( <div key={obg.name}> {obg.id} - {obg.name} </div>)
      )}
      {/*because of the dev mode we will get 1 2 3 then 8 instead of 4*/}
    </div>
  </div>
  )
}

export default App
