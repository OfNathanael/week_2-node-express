require('dotenv').config(); // Load environment variables from the .env file

//Week 2 api.js using express.js
const express = require('express'); // Import the Express.js module.
const app = express(); // Create an instance of the Express application, which will be used to define routes and middleware for the server.

app.use(express.json()); // Middleware to parse incoming JSON payloads

//Logging middleware
app.use((req, res, next) => {
    console.log(`Received  a ${req.method} request for ${req.url} on ${new Date()}`); // Middleware to log the HTTP method and URL of incoming requests along with the current date and time
    next(); // Call the next middleware function in the stack (this is important to avoid hanging the request)
});

app.get('/', (req, res) => {
    res.send('Welcome to my Week 2 API!'); // Define a route for the root URL ("/") that sends a welcome message when accessed with a GET request.
});

app.post('/user', (req, res) => {
    const {name, email} = req.body; // Extract name and email from the request body
    if (!name || !email) return res.status(400).json({error: 'Missing fields'}); // Check if name or email is missing and return a 400 Bad Request response if so
    res.status(200).json({message: `Hello ${name}! Your email is ${email}`}); // Send a response with the user's name and email
});

app.get('/user/:id', (req, res) => {
    res.json({message: `User ${req.params.id} profile`}); // Define a route for the "/user/:id" URL that sends a message with the user ID from the route parameter when accessed with a GET request.
});

//Error handling middleware
app.use((err, req, res, next) => { 
    console.error(err.stack); // Middleware to log the error stack trace to the console
    res.status(500).json({Error: 'Something went wrong!'}); // Send a JSON response with a 500 status code and an error message if an error occurs
});

const port = process.env.PORT; // Define the port number for the server to listen on, using the PORT environment variable from the .env file
app.listen(port, () => {
    console.log(`Week 2 API is now live on port ${port}`); // Start the server and listen on the specified port, logging a message when the server is live
});