import { useState, useEffect, useContext, createContext} from 'react';
import './App.css';

interface Pokemon{
  id: number;
  name : string;
  type: string[];
  hp: number;
  attack : number;
  defense : number;
  special_attack : number;
  special_defense: number;
  speed: number;
}

function usePokemon() : {pokemon : Pokemon[];}{
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  //1 the type of the pokemon array is never[] 0_0
  // we need to define what a pokemon looks like using an interface.

  useEffect(()=>{
    fetch("/pokemon.json")
    .then((res)=>res.json())
    .then((data)=> setPokemon(data));
  }, []);

  return {pokemon};
}
//------------------------------------------------------------------

const ThemeContext = createContext("ligth");

//------------------------------------------------------------------
//To demonstrate the way we can change the context
// for the first displayed Pokemon list we get the default value which is light
// and the second one we get dark

const PokemonList = ({pokemon} : {pokemon: Pokemon[]}) => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h5>List Of Pokemons | ¬Theme : {theme}</h5>
      { 
        pokemon.map((p)=>(
          p.id<5? (<div key={p.id}>{p.id} - {p.name}</div>): (<></>)
        ))
      }
      
      <hr />
    </div>
  );
};

//------------------------------------------------------------------
// Pokemon list with context 

const PokemonContext = createContext<ReturnType<typeof usePokemon>>(
  {} as unknown as ReturnType<typeof usePokemon>
)

function usePokemonCtx(){
  return useContext(PokemonContext);
}

const PokemonList2 = () => {
  const {pokemon} = usePokemonCtx();
  return (
    <div>
      <h5>List Of Pokemons with Context</h5>
      { 
        pokemon.map((p)=>(
          p.id<5? (<div key={p.id}>{p.id} - {p.name}</div>): (<></>)
        ))
      }
    
    </div>
  );
}

//------------------------------------------------------------------
//-------------------------- MAIN APP ----------------------------
//------------------------------------------------------------------

function App() { 
  const {pokemon} = usePokemon();

  return (
    <>
    <div>CUSTOM HOOKS</div>
    <hr />
     <PokemonList pokemon= {pokemon}/>
     <hr />
    <ThemeContext.Provider value="dark">
      <PokemonList pokemon= {pokemon}/>
    </ThemeContext.Provider>
    <hr />
    <PokemonContext.Provider value={usePokemon()}>
      <PokemonList2 />
    </PokemonContext.Provider>
    
    </>
  )
}

export default App
//------------------------------------------------------------------
