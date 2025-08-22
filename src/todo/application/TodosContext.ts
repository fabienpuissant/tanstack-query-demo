import { createContext } from 'react';
import type {Todo} from "@/todo/domain/Todo.ts";
import type { UseQueryResult } from "@tanstack/react-query";

interface TodosContextValue {
  todos: UseQueryResult<Array<Todo>, Error>
}

export const TodosContext = createContext<TodosContextValue>({} as TodosContextValue);
