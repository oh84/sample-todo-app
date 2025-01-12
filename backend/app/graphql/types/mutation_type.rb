# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    
    # タスク作成
    field :create_task, mutation: Mutations::CreateTask, description: "Create a new task"

    # タスク更新
    field :update_task, mutation: Mutations::UpdateTask, description: "Update a task"

    # タスク削除
    field :delete_task, mutation: Mutations::DeleteTask, description: "Delete a task"

    # タスク完了状態の切り替え
    field :toggle_task_completion, mutation: Mutations::ToggleTaskCompletion, description: "Toggle task completion"
  end
end
