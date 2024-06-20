import { createContext, useState } from "react";



 
export let CounterContext =  createContext();

// share logic
export default function CounterContextProvider(props){
    console.log(props);
const [counter, setCounter] = useState(22);
const [counter2, setcounter2] = useState(50);


return <CounterContext.Provider value={ {counter ,setCounter , counter2 , setcounter2}}>

{props.children}

</CounterContext.Provider>

}