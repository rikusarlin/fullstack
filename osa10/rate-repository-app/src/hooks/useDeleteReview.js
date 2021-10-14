import { useMutation } from "@apollo/react-hooks";
import useAuthStorage from '../hooks/useAuthStorage';
import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useDeleteReview = () => {
    const [delReview, result] = useMutation(DELETE_REVIEW);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const deleteReview = async (id) => {
      const token = await authStorage.getAccessToken();
      //console.log("deleteReview, id="+id);
      const payload = await delReview({ 
        variables: { id },
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        } 
      });
    
      apolloClient.resetStore();
      //console.log("deleteReview, review:"+JSON.stringify(payload));

      return payload;
    };
  
    return [deleteReview, result];
  };

  export default useDeleteReview;