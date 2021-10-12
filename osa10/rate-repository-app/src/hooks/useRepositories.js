import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortBy, filterByDebounced) => {
  console.log("useRepositories, sortBy="+sortBy+", searchKeyword="+filterByDebounced);
  var vars = {};
  switch(sortBy){
    case 'latest':
      vars = {"orderBy":"CREATED_AT", "orderDirection": "DESC", "searchKeyword":filterByDebounced};
      break;
    case 'highest':
      vars = {"orderBy":"RATING_AVERAGE", "orderDirection": "DESC", "searchKeyword":filterByDebounced};
      break;
    case 'lowest':
      vars = {"orderBy":"RATING_AVERAGE", "orderDirection": "ASC", "searchKeyword":filterByDebounced};
      break;
    }
    console.log("useRepositories, variables: "+JSON.stringify(vars));
    const { data, loading,  ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
      variables: vars
    });

    const repositories = data ? data.repositories : undefined;
  
    return {
      repositories,
      loading,
      ...result,
    };
  };

export default useRepositories;