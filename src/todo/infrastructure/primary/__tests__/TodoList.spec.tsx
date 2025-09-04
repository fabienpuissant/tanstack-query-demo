import {describe, expect, it, vi} from "vitest";
import {render, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TodosAdapter from "@/todo/infrastructure/secondary/TodosAdapter.ts";
import {TodosProvider} from "@/todo/application/TodosProvider.tsx";
import TodosList from "@/todo/infrastructure/primary/TodosList.tsx";

describe("TodoList", () => {
  it("should render the todo list correctly", async() => {
    const queryClient = new QueryClient();
    const spyGet = vi.spyOn(TodosAdapter.prototype, 'getTodos');
    render(
      <QueryClientProvider client={queryClient}>
        <TodosProvider repository={new TodosAdapter()}>
          <TodosList />
        </TodosProvider>
      </QueryClientProvider>);

    await waitFor(() => {
      expect(spyGet).toHaveBeenCalled();
    })
  });

});
