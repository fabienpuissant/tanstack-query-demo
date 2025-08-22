import type {Todo} from "@/todo/domain/Todo.ts";

interface Props {
  todos: Array<Todo>
}

export default function TodosStats({todos}: Props) {
  return (
    <div className="mt-8 bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Total: {todos.length} tâches</span>
        <span>
          Complétées: {todos.filter(todo => todo.completed).length}
        </span>
        <span>
                Restantes: {todos.filter(todo => !todo.completed).length}
              </span>
      </div>
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${
              todos.length > 0
                ? (todos.filter(todo => todo.completed).length / todos.length) * 100
                : 0
            }%`
          }}
        />
      </div>
    </div>
  )

}
