import {useTodos} from "@/todo/application/useTodos.ts";
import TodosStats from "@/todo/infrastructure/primary/TodosStats.tsx";
import TodosHeader from "@/todo/infrastructure/primary/TodosHeader.tsx";
import TodosList from "@/todo/infrastructure/primary/TodosList.tsx";

export default function TodosPage() {

  const { todos } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">
        <TodosHeader />
        <TodosList />
        {/* Stats */}
        {todos.data && todos.data.length > 0 && (<TodosStats todos={todos.data} />)}
      </div>
    </div>
  )

}
