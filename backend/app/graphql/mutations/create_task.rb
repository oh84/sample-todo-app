module Mutations
  class CreateTask < BaseMutation
    # 入力フィールドの定義
    argument :title, String, required: true
    argument :description, String, required: false
    argument :completed, Boolean, required: false

    # 出力フィールドの定義
    field :task, Types::TaskType, null: true
    field :errors, [String], null: false

    def resolve(title:, description: nil, completed: false)
      task = Task.new(
        title: title,
        description: description,
        completed: completed
      )

      if task.save
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
    end
  end
end 