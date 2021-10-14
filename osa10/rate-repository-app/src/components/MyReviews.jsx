import React from 'react';
import { View, FlatList } from 'react-native';
import Text from './Text';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ItemSeparator from './ItemSeparator';

const MyReviews = () => {
  const {authorizedUser, loading, refetch} = useAuthorizedUser(true);
  if(loading){
    return(
      <View>
        <Text>Loading authorized user and review info...</Text>
      </View>
    );
  } else {
    const reviewNodes = authorizedUser.reviews
      ? authorizedUser.reviews.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} showReponame refetch={refetch}/>}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
  );
  }
};

export default MyReviews;
