import { createContext } from 'react';
import type {Todo} from "@/todo/domain/Todo.ts";
import type { UseQueryResult } from "@tanstack/react-query";
import type {TodoStats} from "@/todo/domain/Stats.ts";

interface TodosContextValue {
  todos: UseQueryResult<Array<Todo>, Error>
  addTodo: (todo: Todo) => void
  stats: UseQueryResult<TodoStats, Error>
}

const todosContext = createContext<TodosContextValue>({} as TodosContextValue);

export default todosContext;
