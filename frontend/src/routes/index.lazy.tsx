import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useTasks } from '../hooks/useTasks'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { CreateTaskForm } from '../components/CreateTaskForm'
import { EditTaskForm } from '../components/EditTaskForm'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isLoading, error } = useTasks()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const deleteTask = useDeleteTask()

  const handleDelete = async (id: string) => {
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      try {
        await deleteTask.mutateAsync(id)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }

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
              {editingTaskId === task.id ? (
                <EditTaskForm
                  task={task}
                  onCancel={() => setEditingTaskId(null)}
                />
              ) : (
                <div>
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
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => setEditingTaskId(task.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                        disabled={deleteTask.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
