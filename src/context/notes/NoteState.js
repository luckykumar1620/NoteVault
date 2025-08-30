import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState=(props)=>{
  const notesInitial=[
    {
        "_id": "68b0b1a3a17088b6358209cd5",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T20:21:14.941Z",
        "__v": 0
    },
    {
        "_id": "68b0b2a3c17088b6358209cd7",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T20:21:16.834Z",
        "__v": 0
    },
    {
        "_id": "68b0b3a4017088b6358209cd9",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T20:21:20.695Z",
        "__v": 0
    },
    {
        "_id": "68b04c8732b16427d3bc54cd4",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T21:21:55.488Z",
        "__v": 0
    },
    {
        "_id": "68b0b5a4017088b6358209cd9",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T20:21:20.695Z",
        "__v": 0
    },
    {
        "_id": "68b06c8732b1456427d3bc54cd4",
        "user": "68b06598063cfdf2a83e98e8",
        "title": "my title",
        "description": "wake up to early",
        "tag": "my personal",
        "date": "2025-08-28T21:21:55.488Z",
        "__v": 0
    },
]
const [notes,setNotes]=useState(notesInitial)

//Add a note
const addNote=(title,description,tag)=>{
    console.log("adding a new newnote");
    const note=   {
        "_id": "68b06c8732b16427d3bc54cd4",
        "user": "68b06598063cfdf2a83e98e8",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2025-08-28T21:21:55.488Z",
        "__v": 0
    }
    setNotes(notes.concat(note))
}
//Delete a note
const deleteNote=()=>{

}
//Edit a note
const editNote=()=>{

}

// const [notes,setNotes]=useState(notesInitial)
    return(
       <noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
          {props.children}
       </noteContext.Provider> 
    )
}

export default NoteState;