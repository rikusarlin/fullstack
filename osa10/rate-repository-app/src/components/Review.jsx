import React from 'react';
import ReviewForm from './ReviewForm';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';


const Review = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const repositoryName = values.reponame;
    const ownerName = values.ownername;
    const rating = values.rating;
    const text = values.review;

    console.log("Submitting review for repo "+repositoryName);
    try {
      const result = await createReview({ repositoryName, ownerName, rating, text });
      history.push(`/repository/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <ReviewForm onSubmit={onSubmit}/>
  );
};

export default Review;