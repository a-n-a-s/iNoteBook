import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/api/notes";

  const NotesInitial = [];

  const [notes, setNotes] = useState(NotesInitial);

  //getAllNotes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/getallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    setNotes(json.notes);
  };

  //addNote
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = json.note;
    
    setNotes(notes.concat(note));
    
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const updateNote = async (id, description, tag, title) => {
    const response = await fetch(`${host}/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        getAllNotes,
        addNote,
        deleteNote,
        updateNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
