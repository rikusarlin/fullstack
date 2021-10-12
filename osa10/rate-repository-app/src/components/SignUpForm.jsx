import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../../theme.js';

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

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};
  
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, "Username needs to be at least 1 characters long")
    .max(30, "Username can be max 30 characters long"),
  password: yup
  .string()
  .required('Password is required')
  .min(5, "Password needs to be at least 5 characters long")
  .max(50, "Password can be max 30 characters long"),
  passwordConfirmation: yup
  .string()
  .oneOf([yup.ref('password'), null], "Passwords do not match")
  .required('Password is required'),
});
  
const SignUpFormContents = ({ onSubmit }) => {
    return (
      <View styles={styles.formContainer}>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='username' name='username' placeholder='Username' />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='password' name='password' placeholder='Password' secureTextEntry />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='passwordConfirmation' name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry />
        </View>
        <View styles={styles.fieldContainer}>
          <View style={styles.submitButton}>
            <Pressable testID='submitSignUp' onPress={onSubmit}>
              <Text align='center' color='textTertiary' padded='all' fontWeight='bold'>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

const SignUpForm = ({ onSubmit }) => {

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpFormContents onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpForm;