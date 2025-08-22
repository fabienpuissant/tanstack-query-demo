import type {Todo} from "@/todo/domain/Todo.ts";

export interface TodoPort {
  getTodos: () => Promise<Array<Todo>>;
}
