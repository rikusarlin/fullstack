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
  ownername: '',
  reponame: '',
  rating: '',
  review: '',
};
  
const validationSchema = yup.object().shape({
  ownername: yup
    .string()
    .required('Repository owner name is required'),
  reponame: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer('Rating needs to be an integer')
    .min(0, '0 is minimum rating')
    .max(100, '100 is maximum rating'),
  review: yup
    .string()
});
  
const ReviewFormContents = ({ onSubmit }) => {
    return (
      <View styles={styles.formContainer}>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='ownername' name='owername' placeholder='Repository owner name' />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='reponame' name='reponame' placeholder='Repository name' />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='rating' name='rating' placeholder='Rating between 0 and 100' />
        </View>
        <View styles={styles.fieldContainer}>
          <FormikTextInput testID='review' name='review' placeholder='Review' multiline numberOfLines={4}/>
        </View>
        <View styles={styles.fieldContainer}>
          <View style={styles.submitButton}>
            <Pressable testID='submitReview' onPress={onSubmit}>
              <Text fontSize='heading' align='center' color='textTertiary' padded='all' fontWeight='bold'>Create a review</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

const ReviewForm = ({ onSubmit }) => {

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewFormContents onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;