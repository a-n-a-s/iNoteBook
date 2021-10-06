import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title :"" , description : "", tag:""})
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.id]: event.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              aria-describedby="emailHelp"
              minLength={5}
              required
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label" htmlFor="tag">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title < 5 || note.description < 5 }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
