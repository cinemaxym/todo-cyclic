const express = require('express');
const mongoose = require('mongoose'); // Import the Mongoose library
const dotenv = require('dotenv').config();


const usersRouter = require('./routes/users'); //Import usersRouter
const todosRouter = require('./routes/todos') //Import todosRouter

const app = express(); // Create a new express application

let PORT = process.env.PORT || 8080 ; // Set the server's port to either the environment variable PORT or the port number 8080

app.use(express.json()); // Use built-in express middleware to parse JSON data in request bodies

app.use('/', todosRouter); // Mount the todosRouter middleware on the root URL path
app.use('/', usersRouter); // Mount the usersRouter middleware on the root URL path

// Connect to the MongoDB database using the provided connection string
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB')) // Log a success message if the connection is successful
.catch((error) => // Log an error message if the connection fails
console.log('Error connecting to MongoDB:', error.message));

// Serve the static files from the frontend build folder
if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('frontend/build'));

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
}

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});

module.exports = app;
