const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// ... rest of your code


// Read user data from the JSON file
const userData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match a user in the JSON file
  const user = userData.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
