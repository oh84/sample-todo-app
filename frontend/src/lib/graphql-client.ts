import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
})
