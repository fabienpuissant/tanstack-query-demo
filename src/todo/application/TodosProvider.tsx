import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useMemo} from "react";
import type {ReactNode} from "react";
import type {Todo} from "@/todo/domain/Todo.ts";
import type {TodoPort} from "@/todo/domain/TodoPort.ts";
import {GET_STATS_QUERY_KEY, GET_TODOS_QUERY_KEY} from "@/todo/application/QueryKey.ts";
import TodosContext from "@/todo/application/TodosContext";

export const TodosProvider = ({repository, children}: { repository: TodoPort, children: ReactNode }) => {

  const queryClient = useQueryClient();

  const query = useQuery({queryKey: [GET_TODOS_QUERY_KEY], queryFn: () => repository.getTodos()})
  const statsQuery = useQuery({queryKey: [GET_STATS_QUERY_KEY], queryFn: () => repository.getStats()})

  const mutation = useMutation({
    mutationFn: (todo: Todo) => repository.addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [GET_TODOS_QUERY_KEY]})
      queryClient.invalidateQueries({queryKey: [GET_STATS_QUERY_KEY]})
    },
  })

  const addTodo = (todo: Todo) => {
    mutation.mutate(todo)
  }

  const contextValue = useMemo(() => ({
    todos: query,
    addTodo,
    stats: statsQuery
  }), [query])

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};
