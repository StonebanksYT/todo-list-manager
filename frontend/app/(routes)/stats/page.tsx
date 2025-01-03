"use client";

import { useTaskContext } from "../../../context/TaskContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Stats() {
  const { tasks } = useTaskContext();

  const completedTasks = tasks.filter((task) => task.status=="completed").length;
  const incompleteTasks = tasks.length - completedTasks;

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Incomplete", value: incompleteTasks },
  ];

  const COLORS = ["#4CAF50", "#FFA000"];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-100">
              Completed Tasks
            </h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {completedTasks}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800 ">
              Incomplete Tasks
            </h2>
            <p className="text-3xl font-bold text-yellow-600 ">
              {incompleteTasks}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
