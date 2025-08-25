import {CheckCircle2, Circle, Trash2} from "lucide-react";
import {useTodos} from "@/todo/application/useTodos.ts";

export default function TodosList() {

  const {todos} = useTodos();

  return (
    <div className="space-y-3">
      {todos.data?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Aucune tâche</h3>
          <p className="text-gray-500">Ajoutez votre première tâche pour commencer !</p>
        </div>
      ) : (
        todos.data?.map((todo) => (
          <div
            key={todo.id}
            className={`group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 ${
              todo.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                // onClick={() => toggleTodo(todo.id)}
                className="mt-1 cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors"
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500"/>
                ) : (
                  <Circle className="w-5 h-5"/>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-gray-800 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`text-gray-600 mt-1 ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}>
                    {todo.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  // onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
