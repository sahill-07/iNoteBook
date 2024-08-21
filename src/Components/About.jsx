import React , {useContext} from 'react'
import NotesContext from '../Context/notes/NotesContext'
const About = () => {
    const a = useContext(NotesContext)
  return (
    <div>
        this is About {a.name} 
    </div>
  )
}

export default About