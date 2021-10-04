import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from 'react-router-native';


const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const history = useHistory();


  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signIn({ username, password });
      console.log(`Auth token: ${await authStorage.getAccessToken()}`);
      history.push('/repositories');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignInForm onSubmit={onSubmit}/>
  );
};

export default SignIn;