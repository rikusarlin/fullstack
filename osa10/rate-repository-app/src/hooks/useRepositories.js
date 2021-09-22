import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";
//import parseSortBy from "../utils/parseSortBy";

/*
const useRepositories = (sortBy, filterText) => {
  const sortVariables = parseSortBy(sortBy);

  const queryVariables = {
    ...sortVariables,
    searchKeyword: filterText,
    first: 4,
  };

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryVariables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};
*/

const useRepositories = () => {

    const { data, loading,  ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
    });

    const repositories = data ? data.repositories : undefined;
    //console.log(repositories);
  
    return {
      repositories,
      loading,
      ...result,
    };
  };

export default useRepositories;