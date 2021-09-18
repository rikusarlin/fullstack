import React from 'react';
import { Pressable, Alert, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
    menuContainer: {
      backgroundColor: theme.colors.menuBackground,
      paddingRight: 20,
      justifyContent: 'space-around'
    }
  });

const MenuItem = ({ menuText }) => {
  return (
    <View styles={styles.menuContainer}>
    <Pressable
      onPress={() => Alert.alert(`You pressed the menu option ${menuText}!`)}
    >
      <Text fontWeight="bold" color="textTertiary" fontSize="heading">{menuText}</Text>
    </Pressable>
    </View>
  );
};

export default MenuItem;