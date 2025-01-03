import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./tasks.db");

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT CHECK(status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending'
    )
  `);
});
const validStatuses = ["pending", "in-progress", "completed"];
export class TaskService {
  static createTask(title: string, description: string, status = "pending") {
    if (!validStatuses.includes(status)) {
      return Promise.reject(new Error("Invalid status value"));
    }
    return new Promise<any>((resolve, reject) => {
      db.run(
        "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
        [title, description, status],
        function (this: any, err) {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve({
            id: this.lastID,
            title,
            description,
            status,
          });
        }
      );
    });
  }

  static getAllTasks() {
    return new Promise<any[]>((resolve, reject) => {
      db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) {
          console.error(`Error fetching tasks: ${err.message}`);
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  static getTaskById(id: number) {
    return new Promise<any>((resolve, reject) => {
      db.get("SELECT * FROM tasks WHERE id = ?", id, (err, row) => {
        if (err) {
          console.error(`Error fetching task by ID: ${err.message}`);
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static updateTask(
    id: number,
    title: string,
    description: string,
    status: string
  ) {
    if (!validStatuses.includes(status)) {
      return Promise.reject(new Error("Invalid status value"));
    }
    return new Promise<any>((resolve, reject) => {
      // Update the task's title, description, and status
      db.run(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, id],
        function (err) {
          if (err) {
            console.error(`Error updating task: ${err.message}`);
            return reject(err);
          }
          if (this.changes === 0) {
            return resolve(null); // Task not found
          }

          // Fetch the updated task
          db.get("SELECT * FROM tasks WHERE id = ?", id, (err, row) => {
            if (err) {
              console.error(`Error fetching updated task: ${err.message}`);
              return reject(err);
            }
            resolve(row); // Return the updated task
          });
        }
      );
    });
  }

  static deleteTask(id: number) {
    return new Promise<any>((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) {
          console.error(`Error deleting task: ${err.message}`);
          return reject(err);
        }
        if (this.changes === 0) {
          return resolve(null); // Task not found
        }
        resolve({ id });
      });
    });
  }
}
