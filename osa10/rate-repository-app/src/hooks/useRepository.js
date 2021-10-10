import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const {data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network"
  });

  /*
  if(data){
    console.log("useRepository, data: "+JSON.stringify(data));
  }
  */

  return {
    repository: data ? data.repository : undefined,
    loading,
    error
  };
};

export default useRepository;