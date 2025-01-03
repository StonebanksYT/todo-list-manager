# Task Management Application

This repository contains a full-stack task management application built using **Next.js** (frontend) and **Node.js** with **SQLite** (backend).

---

## Folder Structure

```
frontend/               # Frontend code for the task management app
  .next/               # Next.js build output
  app/                 # Application pages and routes
    routes/            # Add, edit, and settings pages
    components/        # Shared UI components
    context/           # Context API for task management
  node_modules/        # Dependencies
  public/              # Static assets
  styles/              # Global CSS styles
  .env                 # Environment variables
  package.json         # Frontend dependencies
  tailwind.config.js   # TailwindCSS configuration

todo-api/              # Backend code for the task management app
  src/                 # Source code
    routes/            # API routes
    services/          # Business logic for tasks
  node_modules/        # Dependencies
  .env                 # Environment variables
  tasks.db             # SQLite database
  package.json         # Backend dependencies
  nodemon.json         # Nodemon configuration

.gitignore             # Git ignore rules
```

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn package manager

---

## Setting Up the Project

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### Step 2: Set Up the Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the `frontend` folder and add any required environment variables (if applicable).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The frontend should now be running at [http://localhost:3000](http://localhost:3000).

### Step 3: Set Up the Backend
1. Navigate to the `todo-api` folder:
   ```bash
   cd ../todo-api
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the `todo-api` folder with the following variables:
   ```env
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The backend should now be running at [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Base URL: `http://localhost:5000`

- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Fetch a single task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task by ID

---

## Frontend Features

- **Add Tasks:** Create new tasks with title, description, and status.
- **Edit Tasks:** Modify task details.
- **Task Status:** Update the status to `pending`, `in-progress`, or `completed`.
- **Task List:** View all tasks and their statuses.

---

## Backend Features

- **SQLite Integration:** Lightweight database for storing tasks.
- **Task Validation:** Ensures task statuses are one of `pending`, `in-progress`, or `completed`.
- **REST API:** Provides endpoints for CRUD operations on tasks.

---

## Run the Full Application

1. Open two terminal windows.
2. Start the frontend server in one terminal:
   ```bash
   cd frontend
   npm run dev
   ```
3. Start the backend server in the other terminal:
   ```bash
   cd todo-api
   npm run dev
   ```
4. Access the application at [http://localhost:3000](http://localhost:3000).

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

