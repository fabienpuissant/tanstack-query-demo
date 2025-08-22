import type {Todo} from "@/todo/domain/Todo.ts";

export interface TodoPort {
  getTodos: () => Promise<Array<Todo>>;
  addTodo: (todo: Todo) => Promise<void>;
}
