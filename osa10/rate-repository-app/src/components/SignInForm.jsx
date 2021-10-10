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
};
  
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
  .string()
  .required('Password is required'),
});
  
const SignInFormContents = ({ onSubmit }) => {
    return (
      <View styles={styles.formContainer}>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='username' name='username' placeholder='Username' />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='password' name='password' placeholder='Password' secureTextEntry />
        </View>
        <View styles={styles.fieldContainer}>
          <View style={styles.submitButton}>
            <Pressable testID='submitSignIn' onPress={onSubmit}>
              <Text align='center' color='textTertiary' padded='all' fontWeight='bold'>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

const SignInForm = ({ onSubmit }) => {

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInFormContents onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInForm;