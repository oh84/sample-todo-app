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

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $completed: Boolean) {
    createTask(title: $title, description: $description, completed: $completed) {
      task {
        id
        title
        description
        completed
        createdAt
        updatedAt
      }
      errors
    }
  }
`
