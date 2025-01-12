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

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $completed: Boolean) {
    updateTask(id: $id, title: $title, description: $description, completed: $completed) {
      task {
        id
        title
        description
        completed
        updatedAt
      }
      errors
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      errors
    }
  }
`
