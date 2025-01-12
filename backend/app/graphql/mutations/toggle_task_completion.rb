module Mutations
  class ToggleTaskCompletion < BaseMutation
    # 入力フィールドの定義
    argument :id, ID, required: true

    # 出力フィールドの定義
    field :task, Types::TaskType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      task = Task.find(id)
      
      if task.update(completed: !task.completed)
        {
          task: task,
          errors: []
        }
      else
        {
          task: nil,
          errors: task.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound => _e
      {
        task: nil,
        errors: ["タスクが見つかりません"]
      }
    end
  end
end 