import {createFileRoute} from '@tanstack/react-router'
import TodosPage from "../todo/infrastructure/primary/TodosPage.tsx";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <TodosPage />
    </div>
  )
}
