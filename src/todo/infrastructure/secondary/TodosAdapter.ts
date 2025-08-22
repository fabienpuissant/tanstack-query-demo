import type { Todo } from "@/todo/domain/Todo";
import type {TodoPort} from "@/todo/domain/TodoPort.ts";

export default class TodosAdapter implements TodoPort {

  getTodos(): Promise<Array<Todo>> {
    return Promise.resolve([]);
  }

}
