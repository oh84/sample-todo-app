import { useMutation, useQueryClient } from '@tanstack/react-query'
import { graphqlClient } from '../lib/graphql-client'
import { TOGGLE_TASK_COMPLETION } from '../queries/taskQueries'

export function useToggleTaskCompletion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      graphqlClient.request(TOGGLE_TASK_COMPLETION, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
