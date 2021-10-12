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

export const CREATE_REVIEW = gql`
mutation createReview(
    $repositoryName: String!, 
    $ownerName: String!,
    $rating: Int!,
    $text: String
  ) {
  createReview(review: {
    repositoryName: $repositoryName, 
    ownerName: $ownerName,
    rating: $rating,
    text: $text}) {
      id,
      user {
        id,
        username,
        createdAt,
        reviewCount
      }
      repositoryId,
      userId,
      rating,
      createdAt,
      text
    }
}`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!, 
    $password: String!) {
      createUser(user: { username: $username, password: $password }) {
        id
        username
        createdAt
      }
}`;

