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
  const { authorizedUser } = useAuthorizedUser();
  var signInOut;
  var createRepo;
  var signUp;
  if(authorizedUser === null){
    signInOut = <MenuItem linkTo='/signin' menuText='Sign in '/>;
    signUp = <MenuItem linkTo='/signup' menuText='Sign up '/>;
    createRepo = <MenuItem linkTo='/repositories' menuText=''/>;
  } else {
    signInOut = <MenuItem linkTo='/signout' menuText='Sign out '/>;
    signUp = <MenuItem linkTo='/repositories' menuText=''/>;
    createRepo = <MenuItem linkTo='/review' menuText='Create a review '/>;
  }

  return <View style={styles.view}>
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <MenuItem linkTo='/repositories' menuText='Repositories '/>
      {createRepo}
      {signUp}
      {signInOut}
    </ScrollView>
  </View>;
};

export default AppBar;