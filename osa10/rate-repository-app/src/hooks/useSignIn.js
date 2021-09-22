import { useMutation } from "@apollo/react-hooks";
import AuthStorage from "../utils/authStorage";

import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
    const [authorize, result] = useMutation(AUTHORIZE);
    const authStorage = new AuthStorage();

    const signIn = async ({ username, password }) => {
        await authStorage.removeAccessToken();
        const payload = await authorize({ variables: { username, password } });
        const { data } = payload;
    
        if (data && data.authorize) {
          await authStorage.setAccessToken(data.authorize.accessToken);
        }
    
        return payload;
      };
  
    return [signIn, result];
  };

  export default useSignIn;