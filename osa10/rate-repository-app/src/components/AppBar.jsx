import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import MenuItem from './MenuItem';
import theme from '../../theme';

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
  return <View style={styles.view}>
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <MenuItem linkTo='/repositories' menuText='Repositories '/>
      <MenuItem linkTo='/signin' menuText='Sign in '/>
    </ScrollView>
  </View>;
};

export default AppBar;