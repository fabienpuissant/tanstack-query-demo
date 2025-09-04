import {describe, expect, it} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TodosAdapter from "@/todo/infrastructure/secondary/TodosAdapter.ts";
import {TodosProvider} from "@/todo/application/TodosProvider.tsx";
import TodosHeader from "@/todo/infrastructure/primary/TodosHeader.tsx";

describe("TodoHeader", () => {
  it("should render the todo list correctly", async() => {
    const queryClient = new QueryClient();
    const invalidate = vi.spyOn(queryClient, "invalidateQueries")
    render(
      <QueryClientProvider client={queryClient}>
        <TodosProvider repository={new TodosAdapter()}>
          <TodosHeader />
        </TodosProvider>
      </QueryClientProvider>);

  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(screen.getByTestId("input-title")).toBeDefined();
  })

    fireEvent.input(screen.getByTestId("input-title"), { target: { value: "MyTitle" } })
    fireEvent.input(screen.getByTestId("input-description"), { target: { value: "MyDescription" } })

    fireEvent.click(screen.getByTestId("submit"))

    await waitFor(() => {
      expect(invalidate).toHaveBeenCalledWith({
        queryKey: ["GET_STATS"]
      })
    })

  });

});
