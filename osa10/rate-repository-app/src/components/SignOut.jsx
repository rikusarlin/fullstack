
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

const SignIn = () => {
  const authStorage = useAuthStorage();
  const history = useHistory();
  const apolloClient = useApolloClient();

  authStorage.removeAccessToken();
  apolloClient.resetStore();
  history.push('/repositories');
  return null;
};

export default SignIn;