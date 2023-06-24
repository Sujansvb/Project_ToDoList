const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const USERS = [];
let taskId = 1;

let userId = 1; // Initial user ID
const USERS_DETAILS = []; // Array to store user details

/*
Login
Signup
Create
Read
Update
Delete
*/

app.post('/login', (req, res) => {
  // Check if the request body contains the email and password
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find the user with the given email
  const user = USERS_DETAILS.find((user) => user.email === email);

  if (!user || user.password !== password) {
    // User not found or password does not match
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // User authenticated, generate and send back a token (random string)
  const token = user.userId
  res.status(200).json({ token });
});

app.post('/signup', (req,res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
  
    // Create a new user object with an incremental user ID
    const user = {
      userId: userId++,
      email,
      password,
    };
  
    // Store the user details in the USERS_DETAILS array
    USERS_DETAILS.push(user);
  
    // Return a confirmation string as the response
    res.status(200).send('Signup successful');
});

app.post('/create', (req,res) => {
    const { userId, title, description, date } = req.body;

  // Check if all required fields are present
  if (!userId || !title || !description || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create a new task object with an incremental task ID
  const task = {
    taskId: taskId++,
    userId,
    title,
    description,
    date,
  };

  // Store the task object in the USERS array
  USERS.push(task);

  // Return a confirmation string as the response
  res.status(200).send('Task created successfully');
});


app.post('/delete', (req,res) => {
    const { userId, taskId } = req.body;

    // Check if userId and taskId are provided
    if (!userId || !taskId) {
      return res.status(400).json({ error: 'Missing userId or taskId' });
    }
  
    // Find the index of the task with the matching userId and taskId
    const taskIndex = USERS.findIndex(
      (task) => task.userId === userId && task.taskId === taskId
    );
  
    // Check if the task is found
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Remove the task from the USERS array
    USERS.splice(taskIndex, 1);
  
    // Return a confirmation string as the response
    res.status(200).send('Task deleted successfully');
});

app.post('/update', (req,res) => {
    const { userId, taskId, title, description, date } = req.body;

    // Check if all required fields are present
    if (!userId || !taskId || !title || !description || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Find the index of the task with the matching userId and taskId
    const taskIndex = USERS.findIndex(
      (task) => task.userId === userId && task.taskId === taskId
    );
  
    // Check if the task is found
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Update the task properties with the provided values
    USERS[taskIndex].title = title;
    USERS[taskIndex].description = description;
    USERS[taskIndex].date = date;
  
    // Return a confirmation string as the response
    res.status(200).send('Task updated successfully');
});


app.post('/read', (req,res) => {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
  
    // Find all task objects with the matching userId
    const userTasks = USERS.filter((task) => task.userId === userId);
  
    // Return the task objects as the response
    res.status(200).json(userTasks);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
