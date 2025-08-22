import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo} from "react";
import { TodosContext } from "./TodosContext";
import type {ReactNode} from "react";
import type {Todo} from "@/todo/domain/Todo.ts";
import {GET_TODOS_QUERY_KEY} from "@/todo/application/QueryKey.ts";
import TodosAdapter from "@/todo/infrastructure/secondary/TodosAdapter.ts";

export const TodosProvider = ({ children }: { children: ReactNode }) => {

  const repository = new TodosAdapter();
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: [GET_TODOS_QUERY_KEY], queryFn: () => repository.getTodos() })

  const mutation = useMutation({
    mutationFn: (todo: Todo) => repository.addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS_QUERY_KEY] })
    },
  })

  const addTodo = (todo: Todo) =>{
    mutation.mutate(todo)
  }

  const contextValue = useMemo(() => ({
      todos: query,
      addTodo
  }), [query])

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};
