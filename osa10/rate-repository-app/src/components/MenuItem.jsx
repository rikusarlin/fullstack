import React from 'react';
import { Text, Pressable, Alert, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    menuText: {
      color: theme.colors.textMenu,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes.menu,
      paddingRight: 20,
      justifyContent: 'space-around'
    }
  });

const MenuItem = ({ menuText }) => {
  return (
    <Pressable
      onPress={() => Alert.alert(`You pressed the menu option ${menuText}!`)}
    >
      <Text style={styles.menuText}>{menuText}</Text>
    </Pressable>
  );
};

export default MenuItem;