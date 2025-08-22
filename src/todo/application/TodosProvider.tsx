import { useQuery } from "@tanstack/react-query";
import { useMemo} from "react";
import { TodosContext } from "./TodosContext";
import type {ReactNode} from "react";
import {GET_TODOS_QUERY_KEY} from "@/todo/application/QueryKey.ts";
import TodosAdapter from "@/todo/infrastructure/secondary/TodosAdapter.ts";

export const TodosProvider = ({ children }: { children: ReactNode }) => {

  const repository = new TodosAdapter();

  const query = useQuery({ queryKey: [GET_TODOS_QUERY_KEY], queryFn: () => repository.getTodos() })

  const contextValue = useMemo(() => ({
      todos: query
  }), [query])

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};
