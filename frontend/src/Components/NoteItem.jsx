import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const NoteItem = ({ note, editNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  console.log(note);

  return (
    <div className="col-md-3  ">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Deleted Successfully", "success");
              }}
            ></i>
            <i className="far fa-edit mx-2" onClick={() => editNote(note)}></i>
          </div>

          <p className="card-text text-break ">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
