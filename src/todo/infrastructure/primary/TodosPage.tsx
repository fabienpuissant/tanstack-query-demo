import {useTodos} from "@/todo/application/useTodos.ts";

export default function TodosPage() {

  const {todos} = useTodos();

  return (
    <>
      TodosPage
      {todos.data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </>
  )

}
