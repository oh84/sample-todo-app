module Mutations
  class DeleteTask < BaseMutation
    # 入力フィールドの定義
    argument :id, ID, required: true

    # 出力フィールドの定義
    field :id, ID, null: true
    field :errors, [String], null: false

    def resolve(id:)
      task = Task.find(id)

      if task.destroy
        {
          id: id,
          errors: []
        }
      else
        {
          id: nil,
          errors: task.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound => _e
      {
        id: nil,
        errors: ["タスクが見つかりません"]
      }
    end
  end
end
