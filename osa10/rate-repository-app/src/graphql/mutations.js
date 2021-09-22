import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      user {
        id
        username
        createdAt
      }
      accessToken
      expiresAt
    }
  }
`;