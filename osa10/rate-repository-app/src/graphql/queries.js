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