import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
      return (
        <View style={styles.container}>
        <AppBar/>
        <Switch>
          <Route path="/repositories" exact>
            <RepositoryList />
          </Route>
          <Route path="/repository/:id">
            <SingleRepository />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/signout" exact>
            <SignOut />
          </Route>
          <Redirect to="/repositories" />
        </Switch>
      </View>
      );
  };

export default Main;