"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTaskContext } from "../../../../context/TaskContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types";

export default function EditTask({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchTaskById, updateTask } = useTaskContext();
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await fetchTaskById(parseInt(params.id));
        if (!data) {
          throw new Error("Task not found");
        }
        setTask(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id, fetchTaskById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the task.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Title
            </label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              required
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-foreground"
            >
              Status
            </label>
            <Select
              value={task?.status}
              onValueChange={(value) =>
                setTask((prev) => ({
                  ...prev,
                  status: value as "pending" | "in-progress" | "completed",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Update Task
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
