import { gql } from 'graphql-request'

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`
