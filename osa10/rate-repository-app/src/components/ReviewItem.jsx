import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { format, parseISO } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
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
    paddingBottom: 15,
    flexShrink: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingLeft: 15,
    paddingBottom: 15,
    justifyContent: 'space-evenly',
  },
  deleteReviewButton: {
    flexGrow: 0,
    backgroundColor: theme.colors.deleteBackground,
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    borderColor: 'white',
    borderRadius: 5,
  },
  viewRepoButton: {
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'white',
    borderRadius: 5,
  },
});

const ReviewItem = ({ review, showUsername, showReponame, refetch })  => {
  var username = <Text/>;
  var reponame = <Text/>;
  var buttons = <Text/>;
  const formattedDate = format(parseISO(review.createdAt), 'dd.MM.yyyy');
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const handlePressViewRepo = () => {
    history.push(`/repository/${review.repositoryId}`);
  };

  const createAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "CANCEL",
          onPress: () => {
            //console.log("CANCEL Pressed");
          },
          style: "cancel"
        },
        { text: "DELETE", onPress: () => {
            //console.log("review to delete: "+JSON.stringify(review));
            deleteReview(review.id);
            //console.log("DELETE Pressed, result="+JSON.stringify(result));
            refetch();
          }
        }
      ]
    );

  if(showUsername){
    username = <Text testID="username" padded='bottom' fontWeight='bold' fontSize='subheading'>{review.user.username}</Text>;
  }
  if(showReponame){
    reponame = <Text testID="reponame" padded='bottom' fontWeight='bold' fontSize='subheading'>{review.repositoryId}</Text>;
    buttons =
      <View style={styles.buttonContainer}>
      <View style={styles.viewRepoButton}>
        <Button testID='viewRepoButton' 
          onPress={handlePressViewRepo} title='View repository' color='white'/>
      </View>
      <View style={styles.deleteReviewButton}>
        <Button testID='deleteReviewButton' 
          onPress={createAlert} title='Delete review' color='white'/>
      </View>
    </View>;

  }

  return (
    <View>
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
      <View>
        <View>
          {buttons}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;