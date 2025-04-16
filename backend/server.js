const express = require('express');
const createError = require('http-errors');
require('dotenv').config();

require('./helper/mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'docs')));

// In-memory task list
let tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build a project", completed: false },
  { id: 3, title: "Deploy to server", completed: false },
  { id: 4, title: "Test React App", completed: false },
  { id: 5, title: "Bug Fix", completed: false },
  { id: 6, title: "Restest React App", completed: false },
  { id: 7, title: "Build a project", completed: false },
  { id: 8, title: "Deploy to server", completed: false },
];

// Task Routes
app.get('/api/tasks', (req, res) => {
  setTimeout(() => {
    res.json(tasks);
  }, 200); 
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  res.json(task);
});

// Root
app.get('/', async (req, res, next) => {
  res.send("hello .....");
});

// 404 Handler
app.use(async (req, res, next) => {
  next(createError.NotFound('This route does not exist'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
