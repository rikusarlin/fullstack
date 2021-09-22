import { gql } from "apollo";

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    createdAt
  }
`;