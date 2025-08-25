import {useContext} from "react";
import TodosContext from "@/todo/application/TodosContext.ts";

export const useTodos = () => {
  return useContext(TodosContext);
};
