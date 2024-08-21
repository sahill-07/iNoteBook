const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser.js');
const Notes = require('../models/Notes.models')
const { body, validationResult } = require("express-validator");

router.get('/fetchAllNotes' , fetchUser , async (req , res) => {
    try{
        const notes = await Notes.find({user : req.user.id});
        res.json(notes)
    }catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" });
    }
})

router.post('/addNote' , fetchUser , [
    body("title", "Title should not be empty").exists(),
    body("description", "Description should not be empty").exists()
  ] , async (req , res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title , description , tag} = req.body ;
    try {
        const note = new Notes({
            title , description , tag , user : req.user.id
        })
    
        const savedNote = await note.save();
    
        res.json(savedNote)
    } catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" });
    }
})


router.put('/updateNote/:id' , fetchUser , async (req , res) => {
    const {title , description , tag} = req.body ;
    try {
        const newnote ={} ;
        if(title){
            newnote.title = title ;
        }
        if(description){
            newnote.description = description ;
        }
        if(tag){
        newnote.tag = tag ;
        }

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newnote} , {new :true})
        res.json({note});
    } catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" });
    }
} )


router.delete('/deleteNote/:id' , fetchUser , async (req , res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success" : "note has been deleted"})
    } catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" });
    }
})

module.exports = router ;
