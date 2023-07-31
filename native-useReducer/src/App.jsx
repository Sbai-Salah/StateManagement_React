import { useReducer} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

/////////////////////////// UNDO REDO INIT //////////////////////////
const initialState = {
  history: [],
  currentStateIndex: -1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TEXT':
      const { history, currentStateIndex } = state;
      const newHistory = history.slice(0, currentStateIndex + 1);
      newHistory.push(action.payload);
      return {
        history: newHistory,
        currentStateIndex: currentStateIndex + 1,
      };
    case 'UNDO':
      return {
        ...state,
        currentStateIndex: Math.max(state.currentStateIndex - 1, 0),
      };
    case 'REDO':
      return {
        ...state,
        currentStateIndex: Math.min(
          state.currentStateIndex + 1,
          state.history.length - 1
        ),
      };
    default:
      return state;
  }
}
//////////////////////////////////////////////////////


function UndoRedo(){
  const [state2, dispatch2] = useReducer(reducer, initialState);
  const handleTextChange = (e) => {
    dispatch2({ type: 'ADD_TEXT', payload: e.target.value });
  };

  const handleUndo = () => {
    dispatch2({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch2({ type: 'REDO' });
  };

  const { history, currentStateIndex } = state2;
  const currentText = history[currentStateIndex] || '';

  return (
    <>
       <hr />
       <h3>UNDO/REDO EXAMPLE</h3>
       <br />
       {/* //////// undo-redo example ////// */}
       <div>
       <textarea value={currentText} onChange={handleTextChange} />
       <br />
       <button onClick={handleUndo} disabled={currentStateIndex === 0}>
         Undo
       </button>
       <button
         onClick={handleRedo}
         disabled={currentStateIndex === history.length - 1}
       >
         Redo
       </button>
     </div>
    </>
   )
}


function NameList() {

  const [state, dispatch] = useReducer((state, action)=>{
    switch(action.type){
      case 'SET_NAME':
        return {...state, name: action.payload};
      case 'ADD_NAME':
        return {
          ...state, 
          names: [...state.names, state.name], 
          name: "" // here we're mutating multiple fields at the same time : name and names 
        };
    }
  }, {
    names : [],
    name : "" 
  });

  return (
   <>
      <div className="App">
      <h3>SIMPLE EXAMPLE</h3>
        <div>
          { state.names.map((n, index) =>(<li key={index}>{n}</li>)) }
        </div>
        <br />
        <input type="text" value={state.name} onChange={e => dispatch({type: "SET_NAME", payload: e.target.value})}/>
        <br />
        <br />
        <button
        
        onClick={()=>dispatch({type: "ADD_NAME"})}
        >ADD NAME</button>

      </div>
   
    </>
  )
}

////// in this example of the user form we combine :) the existing state
function UserForm(){
    const [state, dispatch] = useReducer((state, action) => ({...state,...action}), {first: "", last: ""});
    

return (

  <div>
     <hr />
       <h3>USER FORM EXAMPLE</h3>
       <br />
    <input type="text" value={state.first} onChange={(e) => dispatch({first: e.target.value})} />
    <input type="text" value={state.last}  onChange={(e) => dispatch({last: e.target.value})}/>
     <br />
      <div>
        <b>First:</b> {state.first} &nbsp; <b>Last:</b> {state.last}
      </div>
  </div>


);


}

function App(){

  return(
    <div>
        <NameList/>
        <UndoRedo/>
        <UserForm/>
    </div>
  );
}
export default App
