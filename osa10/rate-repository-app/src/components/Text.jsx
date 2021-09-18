import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    text: {
      color: theme.colors.textPrimary,
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
      color: theme.colors.textSecondary,
    },
    colorTextTertiary: {
        color: theme.colors.textTertiary,
    },
    colorPrimary: {
      color: theme.colors.primary,
    },
    fontSizeSubheading: {
      fontSize: theme.fontSizes.subheading,
    },
    fontSizeHeading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
      fontWeight: theme.fontWeights.bold,
    },
    alignCenter: {
        alignSelf: 'center',
    },
    padBottom: {
        paddingBottom: 5,
    },
    padTop: {
        paddingTop: 5,
    },
    padTopAndBottom: {
        paddingBottom: 5,
        paddingTop: 5,
    },
});
  
  const Text = ({ color, fontSize, fontWeight, align, padded, style, ...props }) => {
    const textStyle = [
      styles.text,
      color === 'textSecondary' && styles.colorTextSecondary,
      color === 'primary' && styles.colorPrimary,
      color === 'textTertiary' && styles.colorTextTertiary,
      align === 'center' && styles.alignCenter,
      padded === 'bottom' && styles.padBottom,
      padded === 'top' && styles.padTop,
      padded === 'bottom' && styles.padBottom,
      padded === 'topAndBottom' && styles.padTopAndBottom,
      fontSize === 'subheading' && styles.fontSizeSubheading,
      fontSize === 'heading' && styles.fontSizeHeading,
      fontWeight === 'bold' && styles.fontWeightBold,
      style,
    ];
  
    return <NativeText style={textStyle} {...props} />;
  };
  
  export default Text;