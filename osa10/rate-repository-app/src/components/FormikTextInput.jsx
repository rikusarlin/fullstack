import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../../theme.js';

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.containerBackground,
        borderRadius: 2,
    },
    errorText: {
        marginTop: 5,
        marginLeft: 7,
        textAlign: "left",
        color: "#d73a4a",
    },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.textInput}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;