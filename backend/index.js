require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const Note = require("./models/note");

const cors = require("cors");
app.use(express.static("dist"));
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (_req, res) => {
  Note.find({}).then((notes) => {
    return res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((note) => {
    res.json(note);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});
