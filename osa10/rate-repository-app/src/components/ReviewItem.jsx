import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25
  },
  infoContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 15,
    flexShrink: 1,
  },
});

const ReviewItem = ({ review, showUsername, showReponame })  => {
  var username = <Text/>;
  var reponame = <Text/>;
  if(showUsername){
    username = <Text testID="username" padded='bottom' fontWeight='bold' fontSize='subheading'>{review.user.username}</Text>;
  }
  if(showReponame){
    reponame = <Text testID="reponame" padded='bottom' fontWeight='bold' fontSize='subheading'>{review.repositoryId}</Text>;
  }
  const formattedDate = format(parseISO(review.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text testID="rating" color='primary' fontWeight='bold' fontSize='heading'>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        {username}
        {reponame}
        <Text testID="createdAt" padded='bottom'>{formattedDate}</Text>
        <Text testID="review" padded='right'>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;