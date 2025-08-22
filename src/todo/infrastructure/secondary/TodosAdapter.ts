import type { Todo } from "@/todo/domain/Todo";
import type {TodoPort} from "@/todo/domain/TodoPort.ts";

export default class TodosAdapter implements TodoPort {

  private readonly CACHE_KEY = 'todo-list'

  getTodos(): Promise<Array<Todo>> {
    return Promise.resolve(this.retrieveTodos());
  }

  addTodo(todo: Todo) {
    this.persistTodos([...this.retrieveTodos(), todo])
    return Promise.resolve();
  }

  private persistTodos(todos: Array<Todo>) {
    sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(todos))
  }

  private retrieveTodos(): Array<Todo> {
    return JSON.parse(sessionStorage.getItem(this.CACHE_KEY) ?? "[]")
  }
}
