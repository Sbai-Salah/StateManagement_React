import { useState, useMemo, useCallback} from 'react';
import './App.css'

//4 example for the useMemo with functions and how useCallback can benifit us

function SortedList({list}){
  console.log("sorted list render");
  const sortedList = useMemo(
    ()=> {
      console.log("run sort");
      return [...list].sort();
    }, 
    {list});

  return <div>{sortedList.join(', ')}</div>
  
}


//6 now we will make the sort in place function take our sort function ... 
// IN THIS CASE -_- : we get a re-run of the sort every time we re-render the component
function SortedList2({list, sortFunc}){
  console.log("sorted list render");
  const sortedList2 = useMemo(
    ()=> {
      console.log("run sort");
      return [...list].sort(sortFunc);
    }, 
    [list, sortFunc]);

  return <div>{sortedList2.join(', ')}</div>
  
}

//8 to solve this we will use : useCallback
// check the //9 where we wrap the function with useCallback
function SortedList3({list, sortFunc}){
  console.log("sorted list render");
  const sortedList3 = useMemo(
    ()=> {
      console.log("run sort");
      return [...list].sort(sortFunc);
    }, 
    [list, sortFunc]);

  return <div>{sortedList3.join(', ')}</div>
  
}



function App() {
  //0
  const [numbers] = useState([10,20, 30]);

  const total = useMemo(
    ()=> numbers.reduce((acc, num)=> acc + num, 0),
    [numbers]);

  //////////////////1 objects or array ////////////////////////////
  const [names] = useState(["D", "B", "A", "C"]);
  //2 const sortedNames = names.sort();
      // the sort here do the sort in place, means that it's mutating the actual names
      // that's why we will get the names and sorted names the same if we console log them.
      // to solve this we make a copy before it's getting sorted.
  
  //3 const sortedNames = [...names].sort();
      // the problem here is that each time the component get re-renders its going to run the sort
      // that's why we use useMemo :)
  
  const sortedNames = useMemo(
    ()=> [...names].sort(), 
    [names]);
  
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const totalCount = count1 + count2;

  //7 defining the sortFunc for the //6
  const sortFunc = (a, b) => a.localeCompare(b) * -1;

  //9 using useCallback 
  const sortFunc2 = useCallback((a, b) => a.localeCompare(b) * -1, [] );

  return (
  <>
     {/* this is for displaying //3 */}
    <div>Total: {total}</div>
    <div>Names: {names.join(", ")}</div>
    <div>Sorted Names: {sortedNames.join(", ")}</div>
    <hr />
    {/*5 If we increment in the frontend the values of these two countres the components get rendered
    but the sorted list will not... because we're using useMemo, check the console log above while clicking on the counters */}
    
    <button onClick={()=> setCount1(count1 + 1)}>Counter 1 : {count1}</button>
    <button onClick={()=> setCount2(count2 + 1)}>Counter 2 : {count2}</button>
    <div>{totalCount}</div>
    <hr />
    <div>SORTED LIST 1 : simple useMemo</div>
    <SortedList list={names}/>
    <hr />
    <div>SORTED LIST 2: useMemo with a function</div>
    <SortedList2 list={names} sortFunc= {sortFunc}/>
    <hr />
    <div>SORTED LIST 3: useCallback</div>
    <SortedList3 list={names} sortFunc= {sortFunc2}/>
    
  </>
  )
}

export default App
