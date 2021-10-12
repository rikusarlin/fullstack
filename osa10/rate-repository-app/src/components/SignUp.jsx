import React from 'react';
import SignUpForm from './SignUpForm';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';


const SignUp = () => {
  const [signUp] = useCreateUser();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/repositories');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignUpForm onSubmit={onSubmit}/>
  );
};

export default SignUp;