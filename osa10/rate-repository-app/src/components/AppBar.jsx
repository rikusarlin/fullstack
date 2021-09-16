import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MenuItem from './MenuItem';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: theme.colors.menuBackground,
    paddingBottom: 20
  }
});

const AppBar = () => {
  return <View style={styles.container}>
      <MenuItem menuText="Repositories "/>
      <MenuItem menuText="Menu2"/>
  </View>;
};

export default AppBar;