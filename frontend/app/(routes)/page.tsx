import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-6">My Tasks</h1>
      <TaskList />
    </div>
  );
}
