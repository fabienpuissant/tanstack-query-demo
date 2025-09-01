import type {Todo} from "@/todo/domain/Todo.ts";
import type {TodoStats} from "@/todo/domain/Stats.ts";

export interface TodoPort {
  getTodos: () => Promise<Array<Todo>>;
  addTodo: (todo: Todo) => Promise<void>;
  toggleTodo: (todoId: string) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  getStats: () => Promise<TodoStats>;
}
