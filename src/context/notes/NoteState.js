import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState=(props)=>{
    const s1={
        "name":"lucky",
        "class":"btech cse"
    }

    const [state,setState]=useState(s1);
    const update=()=>{
        setTimeout(() => {
            setState({
              "name":"harry",
              "class":"mech"
          })
            
        }, 1000);
    }
    return(
       <noteContext.Provider value={{state,update}}>
          {props.children}
       </noteContext.Provider> 
    )
}

export default NoteState;