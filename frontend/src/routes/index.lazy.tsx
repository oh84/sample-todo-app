import { createLazyFileRoute } from '@tanstack/react-router'
import { useTasks } from '../hooks/useTasks'
import { CreateTaskForm } from '../components/CreateTaskForm'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isLoading, error } = useTasks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* タスク作成フォーム */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
          Create New Task
        </h2>
        <CreateTaskForm />
      </div>

      {/* タスク一覧 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
          Task List
        </h2>
        <ul className="space-y-3">
          {data?.tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-50 shadow-sm rounded-lg border border-gray-100"
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
    </div>
  )
}
