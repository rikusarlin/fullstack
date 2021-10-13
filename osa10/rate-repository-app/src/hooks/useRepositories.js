import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const createVarList = (sortBy, filterByDebounced, first) => {
  var vars = {
    "first": first
  };
  switch(sortBy){
    case 'latest':
      vars = {
        "orderBy":"CREATED_AT", 
        "orderDirection": "DESC", 
        "searchKeyword":filterByDebounced,
        ...vars
      };
      break;
    case 'highest':
      vars = {
        "orderBy":"RATING_AVERAGE",
        "orderDirection": "DESC",
        "searchKeyword":filterByDebounced,
        ...vars
      };
      break;
    case 'lowest':
      vars = {
        "orderBy":"RATING_AVERAGE",
        "orderDirection": "ASC",
        "searchKeyword":filterByDebounced,
        ...vars};
      break;
  }
  return vars;
};

const useRepositories = (sortBy, filterByDebounced, first) => {
  const variables = createVarList(sortBy, filterByDebounced, first);
  //console.log("useRepositories, variables: "+JSON.stringify(variables));
  const { data, loading,  fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    /*
    console.log(
      "useRepositories.fetchMore, variables="+JSON.stringify(variables)+
      ", after="+data.repositories.pageInfo.endCursor+
      ", canFetchMore="+canFetchMore
      );
    */
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;
  
  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;