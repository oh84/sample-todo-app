import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '../lib/graphql-client'
import { GET_TASKS } from '../queries/taskQueries'
import { Task } from '../types/task'

interface TasksResponse {
  tasks: Task[]
}

export function useTasks() {
  return useQuery<TasksResponse>({
    queryKey: ['tasks'],
    queryFn: async () => graphqlClient.request(GET_TASKS),
  })
}
