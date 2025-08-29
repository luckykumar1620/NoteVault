const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');

//route 1:get all notes using :Get /api/notes/fetchallnotes .login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});


//route 2:add new notes using :POST /api/notes/addnote .login required 
router.post('/addnote', fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 charactr").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are error ,return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});

//route 3:update an existing notes using :put /api/notes/updatenote .login required 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
   try {
     //create a newNote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //find the note to be updated and updated it
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")};

    if(note.user.toString()!==req.user.id){
        res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
   } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    } 
        
});

//route 4:delete an existing notes using :DELETE /api/notes/deletenote .login required 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    // const {title,description,tag}=req.body;
   try {
     let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")};
    
    //allow delete only if user own this note
    if(note.user.toString()!==req.user.id){
        res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted",note:note});
   } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
    //find the note to be deleted and delete it
    
        
})

module.exports = router