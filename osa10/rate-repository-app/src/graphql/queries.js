import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repositories (
  $orderBy: AllRepositoriesOrderBy, 
  $orderDirection: OrderDirection
  $searchKeyword: String
  $first: Int!
  $after: String
){
  repositories (
    orderBy: $orderBy, 
    orderDirection: $orderDirection
    searchKeyword: $searchKeyword
    first: $first
    after: $after
  ){
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
query repository(
  $id: ID!,
  $first: Int!,
  $after: String
	){
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
	reviews(first: $first, after:$after){
    	totalCount,
      pageInfo {
        hasPreviousPage,
        hasNextPage,
        startCursor,
        endCursor
      }
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
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
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
    	totalCount,
      pageInfo {
        hasPreviousPage,
        hasNextPage,
        startCursor,
        endCursor
      }
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
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