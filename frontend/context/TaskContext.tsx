"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  fetchTaskById: (id: number) =>Promise<Task | undefined> ;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const fetchTaskById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch task with id ${id}`);
      }
      const data: Task = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch task:", error);
      return undefined; // Explicitly return undefined on failure.
    }
  };



  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${task.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ title: task.title, description: task.description, status: task.status }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updated: Task = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === updated.id ? { ...t, ...updated } : t
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, fetchTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};
