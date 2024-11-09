const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/writedata", (req, res) => {
  const { name, address, message } = req.body;

  const data = `name: ${name}\naddress: ${address}\nmessage: ${message}\n`;

  fs.writeFile("output.txt", data, (err) => {
    if (err) {
      return res.send({ success: false, message: "Error saving data" });
    }
    res.send({ success: true, message: "Data saved to file successfully" });
  });
});

app.get("/readdata", (req, res) => {
  fs.readFile("output.txt", "utf8", (err, data) => {
    if (err) {
      return res.send({ success: false, message: "Unable to read file" });
    }
    res.send({ success: true, data: data });
  });
});

app.post("/deletefile", (req, res) => {
  fs.unlink("output.txt", (err) => {
    if (err) {
      return res.send({ success: false, message: "Failed to delete file" });
    }
    res.send({ success: true, message: "File deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
