import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const NotesInitial = [
    {
      _id: "6159ff45734269700b2f9723",
      user: "61598057d144f0ced6484cfc",
      title: "My Task",
      description: "Wake up early",
      tag: "Personal",
      date: "2021-10-03T19:06:45.372Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(NotesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
