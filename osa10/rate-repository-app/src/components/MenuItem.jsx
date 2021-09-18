import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
    menuContainer: {
      backgroundColor: theme.colors.menuBackground,
      paddingRight: 20,
      justifyContent: 'space-around'
    }
  });

const MenuItem = ({ menuText, linkTo }) => {
  return (
    <View styles={styles.menuContainer}>
    <Pressable>
      <Link to={linkTo}>
        <Text padded='leftAndRight' fontWeight='bold' color='textTertiary' fontSize='heading'>{menuText}</Text>
      </Link>
    </Pressable>
    </View>
  );
};

export default MenuItem;