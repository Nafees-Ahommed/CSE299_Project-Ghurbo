import express from 'express';   // Importing express module
import "dotenv/config"          // Importing environment variables from .env file
import cors from 'cors';       // Importing CORS middleware
import connectDB from './configs/db.js'; 
import { clerkMiddleware } from '@clerk/express' // Importing Clerk middleware for authentication
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDB() // Connecting to the database using the connectDB function from db.js

const app = express()         // Creating an instance of express
app.use(cors())              // Using CORS middleware to allow cross-origin requests

//Middleware 
app.use(express.json())       // Using express.json() middleware to parse JSON request bodies
app.use(clerkMiddleware())    // Using Clerk middleware for authentication

app.use("/api/clerk",clerkWebhooks)  // Defining a route for Clerk webhooks and using the clerkWebhooks controller

app.get('/', (req, res) => res.send('Server API is working')) // Defining a simple route to check if the API is working

const PORT = process.env.PORT || 3000; // Setting the port from environment variables or defaulting to 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Starting the server and logging the port number