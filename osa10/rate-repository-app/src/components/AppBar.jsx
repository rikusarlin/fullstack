import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import MenuItem from './MenuItem';
import theme from '../../theme';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.menuBackground,
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingRight: 20,
    backgroundColor: theme.colors.menuBackground,
  },
});

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser(false);
  var signInOut;
  var createReview;
  var signUp;
  var myReviews;
  if(authorizedUser === null){
    signInOut = <MenuItem linkTo='/signin' menuText='Sign in '/>;
    signUp = <MenuItem linkTo='/signup' menuText='Sign up '/>;
    createReview = <MenuItem linkTo='/repositories' menuText=''/>;
    myReviews = <MenuItem linkTo='/myreviews' menuText=''/>;
  } else {
    signInOut = <MenuItem linkTo='/signout' menuText='Sign out '/>;
    signUp = <MenuItem linkTo='/repositories' menuText=''/>;
    createReview = <MenuItem linkTo='/review' menuText='Create a review '/>;
    myReviews = <MenuItem linkTo='/myreviews' menuText='My reviews '/>;
  }

  return <View style={styles.view}>
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <MenuItem linkTo='/repositories' menuText='Repositories '/>
      {createReview}
      {myReviews}
      {signUp}
      {signInOut}
    </ScrollView>
  </View>;
};

export default AppBar;