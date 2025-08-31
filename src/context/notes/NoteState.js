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
    const note=await response.json();
     setNotes(notes.concat(note))   
   
}
//Delete a note
const deleteNote=async(id)=>{
  //API Call
   const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiMDY1OTgwNjNjZmRmMmE4M2U5OGU4In0sImlhdCI6MTc1NjQwNTY3Nn0.INHKn--EYMZPumkBIUYqiXnSJUIvNHBS1XVAq0w16UE"
        }
       
    });
    const json= response.json();
  const newNotes=notes.filter((note)=>{return note._id!==id});
  setNotes(newNotes);
}


//Edit a note
const editNote=async(id,title,description,tag)=>{
    //TODO API CALL
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiMDY1OTgwNjNjZmRmMmE4M2U5OGU4In0sImlhdCI6MTc1NjQwNTY3Nn0.INHKn--EYMZPumkBIUYqiXnSJUIvNHBS1XVAq0w16UE"
        },
        body:JSON.stringify({title,description,tag})
    });
    const json=await response.json();
     
    
     let newNotes=JSON.parse(JSON.stringify(notes))
    //Logic to edit client
    for (let index = 0; index < newNotes.length; index++) {
        const element=newNotes[index]
       if(element._id===id){
         newNotes[index].title=title;
         newNotes[index].description=description;
         newNotes[index].tag=tag;
          break; 
       }
         
    }
    setNotes(newNotes);
}

// const [notes,setNotes]=useState(notesInitial)
    return(
       <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
          {props.children}
       </noteContext.Provider> 
    )
}

export default NoteState;