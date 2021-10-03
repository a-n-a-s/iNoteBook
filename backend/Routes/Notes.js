const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser");
const NotesModel = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/getallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.user.id });
    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/addnote",
  [
    body("title", "Title Must Have atleast 3 letters").isLength({ min: 3 }),
    body("description", "Description Must Have atleast 5 letters").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new NotesModel({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.put(
  "/updatenote/:id",
  [
    body("title", "Title Must Have atleast 3 letters").isLength({ min: 3 }),
    body("description", "Description Must Have atleast 5 letters").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      let note = await NotesModel.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await NotesModel.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json({ note });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await NotesModel.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted", note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
