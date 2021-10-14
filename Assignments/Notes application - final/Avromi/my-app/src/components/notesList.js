import React from 'react';
import ToDo from './toDo';


function NotesList(props) {

        return (
      <div style={{
          display:'grid',
          gridColumnGap: '16px',
          rowGap: 16,
          gridTemplateColumns: 'repeat(4, 1fr)'
      }}>
          {props.notes.map((note, index) => <ToDo todo={note.text} time={note.date} index={index} deleteNote={props.deleteNote} key={note.id}/>)}
      </div>
          );
         
 }
 export default NotesList