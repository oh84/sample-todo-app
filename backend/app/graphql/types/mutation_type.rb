# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    
    # タスク作成

    field :create_task, mutation: Mutations::CreateTask, description: "Create a new task"
  end
end
