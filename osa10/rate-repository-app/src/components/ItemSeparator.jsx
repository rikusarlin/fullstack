import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    separator: {
      height: 5,
      backgroundColor: theme.colors.containerBackground,
    },
  });
  

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;