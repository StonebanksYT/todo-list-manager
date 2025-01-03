"use client";

import { useTaskContext } from "../context/TaskContext";
import { CheckCircle, Circle, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TaskItemProps = {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
};

export default function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, updateTask } = useTaskContext();

  const toggleStatus = () => {
    
    updateTask({
      ...task,
      status: task.status == "completed" ? "pending" : "completed",
    });
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleStatus}
              className="mt-1"
            >
              {task.status == "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
            <div>
              <h3
                className={`text-lg font-medium ${
                  task.status == "completed"
                    ? "text-muted-foreground line-through"
                    : "text-card-foreground"
                }`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {task.description}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/edit/${task.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil className="w-5 h-5" />
            </Link>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
