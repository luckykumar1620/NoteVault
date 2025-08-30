import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState=(props)=>{
    const host="http://localhost:5000"
  const notesInitial=[]
const [notes,setNotes]=useState(notesInitial);

//GET ALL NOTES
//api call
//Add a note
const getNotes=async()=>{
    //TODO API CALL
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
            'content-type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiMDY1OTgwNjNjZmRmMmE4M2U5OGU4In0sImlhdCI6MTc1NjQwNTY3Nn0.INHKn--EYMZPumkBIUYqiXnSJUIvNHBS1XVAq0w16UE"
        },
        
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
}

//Add a note
const addNote=async(title,description,tag)=>{
    //TODO API CALL
    const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiMDY1OTgwNjNjZmRmMmE4M2U5OGU4In0sImlhdCI6MTc1NjQwNTY3Nn0.INHKn--EYMZPumkBIUYqiXnSJUIvNHBS1XVAq0w16UE"
        },
        body:JSON.stringify({title,description,tag})
    });
    

    //logic for add note
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
const deleteNote=(id)=>{
  console.log("note has been deleted id:" + id);
  const newNotes=notes.filter((note)=>{return note._id!==id});
  setNotes(newNotes);
}
//Edit a note
const editNote=async(id,title,description,tag)=>{
    //TODO API CALL
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiMDY1OTgwNjNjZmRmMmE4M2U5OGU4In0sImlhdCI6MTc1NjQwNTY3Nn0.INHKn--EYMZPumkBIUYqiXnSJUIvNHBS1XVAq0w16UE"
        },
        body:JSON.stringify({title,description,tag})
    });
    const json= response.json();

    //Logic to edit client
    for (let index = 0; index < notes.length; index++) {
        const element=notes[index]
       if(element._id===id){
         element.title=title;
         element.description=description;
         element.tag=tag;
       }
        
    }
}

// const [notes,setNotes]=useState(notesInitial)
    return(
       <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
          {props.children}
       </noteContext.Provider> 
    )
}

export default NoteState;