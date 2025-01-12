import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useTasks } from '../hooks/useTasks'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useToggleTaskCompletion } from '../hooks/useToggleTaskCompletion'
import { CreateTaskForm } from '../components/CreateTaskForm'
import { EditTaskForm } from '../components/EditTaskForm'
import { Modal } from '../components/Modal'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { data, isLoading, error } = useTasks()
  const deleteTask = useDeleteTask()
  const toggleCompletion = useToggleTaskCompletion()

  // タスクを作成日時の降順でソート
  const sortedTasks = [...(data?.tasks || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const handleDelete = async (id: string) => {
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      try {
        await deleteTask.mutateAsync(id)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }

  const handleToggleCompletion = async (id: string) => {
    try {
      await toggleCompletion.mutateAsync(id)
    } catch (error) {
      console.error('Failed to toggle task completion:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-gray-100">
      {/* コンテンツを中央に配置するためのコンテナ */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create New Task
          </button>
        </div>

        {/* タスク一覧 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            Task List
          </h2>
          <ul className="space-y-3">
            {sortedTasks.map((task) => (
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
                        onChange={() => handleToggleCompletion(task.id)}
                        disabled={toggleCompletion.isPending}
                        className="h-4 w-4 cursor-pointer"
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

        {/* タスク作成モーダル */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Task"
        >
          <CreateTaskForm
            onSuccess={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  )
}
