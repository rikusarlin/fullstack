import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import MenuItem from './MenuItem';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    paddingBottom: 20,
    backgroundColor: theme.colors.menuBackground,
  },
});

const AppBar = () => {
  return <View>
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <MenuItem linkTo='/signin' menuText='Sign in'/>
      <MenuItem linkTo='/repositories' menuText='Repositories'/>
    </ScrollView>
  </View>;
};

export default AppBar;