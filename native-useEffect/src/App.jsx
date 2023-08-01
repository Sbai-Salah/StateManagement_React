import { useState , useEffect} from 'react'
import './App.css'



//7 stowatch example : 

const StopWatch = () => {
  const [time, setTime] = useState(0);
  
  useEffect(()=>{
    const interval = setInterval(()=>{
        setTime((t)=>{
          console.log(t);
            return t +1;
        })
    }, 1000);
    return ()=> clearInterval(interval);

  }, []);
  
  return <div>Time : {time}</div>
}





function App() {
  console.log("rendering app"); //0 we will get a fetching error because we're fetching in a loop
  const [names, setNames] = useState([]);
/*1
The problem with this code bellow is that it will cause an infinite loop.
The fetch function is called every time the component is rendered.
This causes the component to re-render, which calls the fetch function again, and so on. 
*/
  // fetch("/names.json")
  //   .then(res => res.json())
  //   .then(data => setNames(data));

useEffect(()=>{
    fetch("/names.json")
    .then(res => res.json())
    .then(data => setNames(data));
}, []);

//2 the useEffect or the fetch is done twice ... why is that ?
/*
react mount it -> which render it 
and re-mount it again.

development mode which follows "mount unmount and then again mount lifecycle"
to make it render only one remove the strict mode : 
  <React.StrictMode>
    <App />
  </React.StrictMode>,


*/

//3-continue
const [selectedName, setSelectedName] = useState(null);

//4 now we fetch the details of each name when it is selected
useEffect(()=>{
  fetch(`/${selectedName}.json`)
  .then(res => res.json())
  .then(data => setSelectedNameDetails(data));
}, [selectedName]);

//5 and let's store that data fetched 
const [selectedNameDetails, setSelectedNameDetails] = useState(null);



  return (
    <>
    <div>Names : {names.join(", ")}</div>
    {/* 3 Now let's see how we use the dependency array with useEffect */}
    <hr />
    <div>
      {names.map((name)=> <button
        onClick={()=> setSelectedName(name)}
      >{name}</button>)}
    </div>
    <div>{JSON.stringify(selectedNameDetails)}</div>
    {/*6 the workflow when we click on a name:
        - when we click the name selected sets to the selectedName
        - then get passed as a deps array to useEffect
        - this triggers the useEffect to fetch.
        + But we get a null.json request !!! 
        + what's happening is that we have the null as an initial value
        + we passe it to the deps array and it fetches the null.json (does not exist of course :)
        + to bypass this we simply add an if before the fetch
        + another change we can make is to take the body of the useEffect meaning the whole fetching part 
        + and put it in a callback function like : onSelectedNameChange and call it every time the use clicks the button
        + and we can get rid of the useEffect :) 
    */}

    {/*7 output for the stopwatch  */}
    <StopWatch/>

    </>

  )
}

export default App
