//Connect to MongoDB
require("dotenv").config();
const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}

//Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

const Task = mongoose.model("Task", taskSchema);

//Connect Server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json({ limit: "5000kb" }));
app.use(express.urlencoded({ limit: "5000kb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Node.js Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongo();
});

//routes
// Create (POST) route

app.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  const task = new Task({ title, description, completed });

  task
    .save()
    .then((savedTask) => {
      res.json(savedTask);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// Read (GET) route
app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// Update (PUT) route
app.put("/tasks/:id", (req, res) => {
  const { title, description, completed } = req.body;

  Task.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true })
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// Delete (DELETE) route
app.delete("/tasks/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});
