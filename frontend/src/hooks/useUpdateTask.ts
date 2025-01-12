import { useMutation, useQueryClient } from '@tanstack/react-query'
import { graphqlClient } from '../lib/graphql-client'
import { UPDATE_TASK } from '../queries/taskQueries'

interface UpdateTaskInput {
  id: string
  title?: string
  description?: string
  completed?: boolean
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateTaskInput) =>
      graphqlClient.request(UPDATE_TASK, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
