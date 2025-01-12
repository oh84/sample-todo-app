import { createLazyFileRoute } from '@tanstack/react-router'
import { useTasks } from '../hooks/useTasks'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isLoading, error } = useTasks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <ul className="space-y-2">
        {data?.tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white shadow rounded-lg"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-4 w-4"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </div>
            {task.description && (
              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
