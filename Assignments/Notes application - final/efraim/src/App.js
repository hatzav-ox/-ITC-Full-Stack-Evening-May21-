import './App.css';
import Form from './components/form'
import NoteList from './components/notelist'
import ArchiveList from './components/archiveList'
import localforage from "localforage";
import {useState, useEffect} from 'react'

// deploy site https://distracted-bhabha-fb801a.netlify.app/

function App(){
 
  const [notes, setNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [showArchive, setShowArchive] = useState(false)


// originally had the async like useEffect(async()=> {logic }) but console and terminal was 
//giving me an error and also couldn't deploy until i changed it to below

  useEffect(() => {
    async function getNotesFromStorage(){
      const notesFromStorage = await localforage.getItem('notes')
      if(notesFromStorage){
        setNotes(notesFromStorage)
        notesFromStorage.forEach(notes => {
        if(notes.dateToRemind === new Date().toISOString().split('T')[0] ){
            alert(`Reminder Due for ${notes.title}!! 
            Note: ${notes.note}`)
          }
        })}}
        getNotesFromStorage()
  }, [])
  useEffect(() => {
    async function getArchiveFromStorage(){
    const archiveFromStorage = await localforage.getItem('archivedNotes')
    if(archiveFromStorage){
      setArchivedNotes(archiveFromStorage)
    }}getArchiveFromStorage()
},[])

  function addNote (newNote) {
    const newNotesArray = [...notes, newNote]
    setNotes(newNotesArray)
    localforage.setItem('notes', newNotesArray)
  }
  
  function sortNotes(notesArray){
    notesArray.sort(function (a, b) {
      return new Date(a.readbleDate) - new Date(b.readbleDate);
  });
  }

  function restoreNote (restoredNote, index) {
    const newNotesArray = [...notes, restoredNote]
    sortNotes(newNotesArray)
    setNotes(newNotesArray)
    const newArchiveArray = [...archivedNotes]
    newArchiveArray.splice(index, 1)
    setArchivedNotes(newArchiveArray)
    localforage.setItem('notes', newNotesArray)
    localforage.setItem('archivedNotes', newArchiveArray)
  }

  function deleteNote (index) {
      if (window.confirm("Do you really want to delete?")) {
      const newNoteArray = [...notes]
      const noteToArchive = newNoteArray[index]
      const newArchiveArray = [...archivedNotes, noteToArchive]
      setArchivedNotes(newArchiveArray)
      newNoteArray.splice(index, 1)
      setNotes(newNoteArray)
      localforage.setItem('notes', newNoteArray)
      localforage.setItem('archivedNotes', newArchiveArray)
    }}

  function editNote(id, title, note) {
    const noteToEdit = notes.find(note=> note.id === id)
    noteToEdit.note = note
    noteToEdit.updatedDate = `Updated On: ${new Date().toUTCString().slice(0, -7)}`
    noteToEdit.title = title
    setNotes([...notes])
    localforage.setItem('notes', notes)
  }
  function showTheArchive(){
    if(archivedNotes.length !== 0){
      setShowArchive(!showArchive)
    }else{
      alert("No deleted notes!")
    }
  }
  
      return (
     <div>
      <Form addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote}/>
      <button onClick={showTheArchive}>
              Show/Hide Archived
            </button>
      {showArchive && <ArchiveList archivedNotes={archivedNotes} restoreNote={restoreNote}/>}
     </div>
  );
}
export default App;
