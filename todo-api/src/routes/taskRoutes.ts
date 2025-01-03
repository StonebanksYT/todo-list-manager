import { Router, Request, Response, RequestHandler } from 'express';
import { TaskService } from '../services/taskService';

const router = Router();

// POST /tasks - Create a new task
const createTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: 'Title and description are required' });
    return; 
  }
  try {
    const newTask = await TaskService.createTask(title, description);
    res.status(201).json(newTask); // Return the response.
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// GET /tasks - Fetch all tasks
const getAllTasks: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks); // Return the response.
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// GET /tasks/:id - Fetch task by ID
const getTaskById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await TaskService.getTaskById(Number(id));
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return; 
    }
    res.status(200).json(task); // Return the response.
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

// PUT /tasks/:id - Update task title, description, and status
const updateTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    res.status(400).json({ message: 'Title, description, and status are required' });
    return; 
  }

  try {
    const updatedTask = await TaskService.updateTask(Number(id), title, description, status);
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return; 
    }
    res.status(200).json(updatedTask); // Return the updated task.
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// DELETE /tasks/:id - Delete task by ID
const deleteTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTask = await TaskService.deleteTask(Number(id));
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return; 
    }
    res.status(204).send(); // Send no content response.
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Define the routes
router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export { router as TaskRoutes };
