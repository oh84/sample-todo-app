import { useMutation, useQueryClient } from '@tanstack/react-query'
import { graphqlClient } from '../lib/graphql-client'
import { CREATE_TASK } from '../queries/taskQueries'

interface CreateTaskInput {
  title: string
  description?: string
  completed?: boolean
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTaskInput) =>
      graphqlClient.request(CREATE_TASK, input),
    onSuccess: () => {
      // タスク一覧を再取得
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
