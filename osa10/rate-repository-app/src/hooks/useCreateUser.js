import { useMutation } from "@apollo/react-hooks";
import useAuthStorage from '../hooks/useAuthStorage';
import { CREATE_USER } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useSignUp = () => {
    const [createUser, result] = useMutation(CREATE_USER);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signUp = async ({ username, password }) => {
        await authStorage.removeAccessToken();
        const payload = await createUser({ variables: { username, password } });
        apolloClient.resetStore();
        return payload;
      };
  
    return [signUp, result];
  };

  export default useSignUp;