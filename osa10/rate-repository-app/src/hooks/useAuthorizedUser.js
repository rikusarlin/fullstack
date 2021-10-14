import { useQuery } from "@apollo/react-hooks";

import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (fetchReviews) => {
    const variables = {
      "includeReviews": fetchReviews
    };

    const { data, loading,  refetch, ...result } = useQuery(AUTHORIZED_USER, {
      fetchPolicy: "cache-and-network",
      variables: variables
    });

    const authorizedUser = data ? data.authorizedUser : undefined;
    //console.log("Authorized user: "+JSON.stringify(authorizedUser));
  
    return {
      authorizedUser,
      loading,
      refetch,
      ...result,
    };
  };

export default useAuthorizedUser;