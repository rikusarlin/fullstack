import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../../theme';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from "react-router-native";


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

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View styles={styles.formContainer}>
      <View styles={styles.fieldContainer}>
        <FormikTextInput name="repositoryOwner" placeholder="Repository owner name" />
        <FormikTextInput name="repositoryName" placeholder="Repository name"/>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
        <FormikTextInput name="text" placeholder="Review" multiline={true} numberOfLines={4}/>
        <View style={styles.submitButton}>
            <Pressable testID='submitReview' onPress={onSubmit}>
              <Text fontSize='heading' align='center' color='textTertiary' padded='all' fontWeight='bold'>Create a review</Text>
            </Pressable>
        </View>        
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup 
    .number()
    .integer('Rating must be an integer')
    .min(0,'Rating minimum value is 0')
    .max(100,'Rating maximum value is 100')
    .required('Rating is required')
});

const Review = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, text} = values;

    //console.log("repositoryOwner: "+repositoryOwner);
    //console.log("repositoryName: "+repositoryName);
    //console.log("rating: "+rating);
    //console.log("text: "+text);

    try {
      const result = await createReview({ repositoryOwner, repositoryName, rating, text});
      history.push(`/repository/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;