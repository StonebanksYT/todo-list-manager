import express from 'express';
import { TaskRoutes } from './routes/taskRoutes';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all domains
app.use(cors()); 

app.use(express.json());

// Routes
app.use('/tasks', TaskRoutes); // Register your task routes

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});