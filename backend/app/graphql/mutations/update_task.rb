module Mutations
  class UpdateTask < BaseMutation
    # 入力フィールドの定義
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :description, String, required: false
    argument :completed, Boolean, required: false

    # 出力フィールドの定義
    field :task, Types::TaskType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)
      task = Task.find(id)

      if task.update(attributes)
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
        errors: ["Task not found"]
      }
    end
  end
end
