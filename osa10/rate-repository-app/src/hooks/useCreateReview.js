import { useMutation } from "@apollo/react-hooks";
import useAuthStorage from '../hooks/useAuthStorage';
import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useCreateReview = () => {
    const [createReview, result] = useMutation(CREATE_REVIEW);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const createRepoReview = async ({ repositoryName, repositoryOwner, rating, text }) => {
        const token = await authStorage.getAccessToken();
        const payload = await createReview({ 
          variables: { 
            'repositoryName':repositoryName, 
            'ownerName': repositoryOwner, 
            'rating': parseInt(rating), 
            'text': text },
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          } 
        });
    
        apolloClient.resetStore();
        // console.log("createReview, review:"+JSON.stringify(payload));

        return payload;
      };
  
    return [createRepoReview, result];
  };

  export default useCreateReview;