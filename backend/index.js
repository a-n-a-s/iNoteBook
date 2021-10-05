const cors = require("cors");
const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/notes", require("./Routes/Notes"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
