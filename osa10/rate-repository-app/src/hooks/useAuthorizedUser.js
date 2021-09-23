import { useQuery } from "@apollo/react-hooks";

import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = () => {

    const { data, loading,  ...result } = useQuery(AUTHORIZED_USER, {
      fetchPolicy: "cache-and-network",
    });

    const authorizedUser = data ? data.authorizedUser : undefined;
    //console.log(repositories);
  
    return {
      authorizedUser,
      loading,
      ...result,
    };
  };

export default useAuthorizedUser;