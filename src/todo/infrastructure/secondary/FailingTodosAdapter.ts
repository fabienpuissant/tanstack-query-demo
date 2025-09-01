import type {Todo} from "@/todo/domain/Todo";
import type {TodoPort} from "@/todo/domain/TodoPort.ts";

export default class FailingTodosAdapter implements TodoPort {

  private readonly CACHE_KEY = 'todo-list'
  private failCount = 0;

  getTodos(): Promise<Array<Todo>> {
    return Promise.resolve(this.retrieveTodos());
  }

  addTodo(todo: Todo) {
    if(this.failCount < 2) {
      this.failCount++;
      return Promise.reject(new Error("Simulated failure"));
    }
    this.failCount = 0;
    this.persistTodos([...this.retrieveTodos(), todo])
    return Promise.resolve();
  }

  toggleTodo(todoId: string) {
    if(this.failCount < 2) {
      this.failCount++;
      return Promise.reject(new Error("Simulated failure"));
    }
    this.failCount = 0;
    const todos = this.retrieveTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.persistTodos(updatedTodos);
    return Promise.resolve();
  }

  deleteTodo(todoId: string) {
    if(this.failCount < 2) {
      this.failCount++;
      return Promise.reject(new Error("Simulated failure"));
    }
    this.failCount = 0;
    const todos = this.retrieveTodos();
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    this.persistTodos(updatedTodos);
    return Promise.resolve();
  }

  getStats() {
    const todos = this.retrieveTodos();
    return Promise.resolve({
      total: todos.length,
      totalCompleted: todos.filter(todo => todo.completed).length,
      totalRemaining: todos.filter(todo => !todo.completed).length
    });
  };

  private persistTodos(todos: Array<Todo>) {
    sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(todos))
  }

  private retrieveTodos(): Array<Todo> {
    return JSON.parse(sessionStorage.getItem(this.CACHE_KEY) ?? "[]")
  }
}
