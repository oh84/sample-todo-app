# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    
    # タスク作成
    field :create_task, mutation: Mutations::CreateTask, description: "Create a new task"

    # タスク更新
    field :update_task, mutation: Mutations::UpdateTask, description: "Update a task"
  end
end
