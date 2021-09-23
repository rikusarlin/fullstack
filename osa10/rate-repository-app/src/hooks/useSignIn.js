import { useMutation } from "@apollo/react-hooks";
import useAuthStorage from '../hooks/useAuthStorage';
import { AUTHORIZE } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
    const [authorize, result] = useMutation(AUTHORIZE);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        await authStorage.removeAccessToken();
        const payload = await authorize({ variables: { username, password } });
        const { data } = payload;
    
        if (data && data.authorize) {
          await authStorage.setAccessToken(data.authorize.accessToken);
        }
        apolloClient.resetStore();
    
        return payload;
      };
  
    return [signIn, result];
  };

  export default useSignIn;