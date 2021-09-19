import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../../theme.js';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
  .string()
  .required('Password is required'),
});

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    backgroundColor: theme.colors.bodyBackground,
    color: theme.colors.containerBackground
  },
  fieldContainer: {
     marginBottom: 5,
  },
  submitButton: {
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textTertiary,
    borderRadius: 2,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View styles={styles.formContainer}>
      <View styles={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View styles={styles.fieldContainer}>
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      </View>
      <View styles={styles.fieldContainer}>
        <View style={styles.submitButton}>
          <Pressable onPress={onSubmit}>
            <Text align="center" color='textTertiary' padded='all' fontWeight='bold'>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.password;

    console.log(`Attempt sign with username: ${username} and password ${password}`);
  };
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;