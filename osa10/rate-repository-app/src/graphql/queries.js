import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        totalCount,
        pageInfo {
          hasPreviousPage,
          hasNextPage,
          startCursor,
          endCursor
        }
        edges {
          cursor,
          node {
            id,
            fullName,
            description,
            language,
            forksCount, 
            stargazersCount, 
            ratingAverage, 
            reviewCount,
            ownerAvatarUrl
          }
        }
      }
  }
`;

export const GET_REPOSITORY = gql`
query repository($id: ID!){
  repository(id: $id ) {
    id,
    fullName,
    description,
    language,
    forksCount, 
    stargazersCount, 
    ratingAverage, 
    reviewCount,
    ownerAvatarUrl,
    url,
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;