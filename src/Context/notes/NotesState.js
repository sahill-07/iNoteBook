import React , {useState} from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "66c0a48d725b2f759a6de191",
          "user": "66bf5d9786467096c9e91632",
          "title": "title",
          "description": "kuch to hai yaar ye",
          "tag": "personal",
          "date": "2024-08-17T13:24:29.555Z",
          "__v": 0
        },
        {
          "_id": "66c0a49a725b2f759a6de193",
          "user": "66bf5d9786467096c9e91632",
          "title": "title2",
          "description": "kuch to hai yaar ye 2",
          "tag": "personal",
          "date": "2024-08-17T13:24:42.177Z",
          "__v": 0
        },
        {
          "_id": "66c0a4a3725b2f759a6de195",
          "user": "66bf5d9786467096c9e91632",
          "title": "title3",
          "description": "kuch to hai yaar ye 3",
          "tag": "personal",
          "date": "2024-08-17T13:24:51.029Z",
          "__v": 0
        }
      ]

      const [notes, setnotes] = useState(notesInitial)

      const addNote = () => {

      }

      const deleteNote = () => {
        
      }

      const editNote = () => {
        
      }

    return (
        <NotesContext.Provider value={{notes ,setnotes , addNote , deleteNote , editNote} }>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;