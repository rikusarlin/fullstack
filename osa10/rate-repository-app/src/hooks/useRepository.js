import { useQuery } from "@apollo/react-hooks";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
  const variables = {
    "id": id,
    "first": first
  };
  //console.log("useRepository, variables="+JSON.stringify(variables));
  const { data, loading,  fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });
  /*
  if(data){
    console.log("useRepository, data: "+JSON.stringify(data));
  }
  */

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    /*
    console.log(
      "useRepository.fetchMore, variables="+JSON.stringify(variables)+
      ", after="+data.repository.reviews.pageInfo.endCursor+
      ", canFetchMore="+canFetchMore
      );
    */
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useRepository;