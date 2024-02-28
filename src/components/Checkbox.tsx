import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Checkbox = ({checked}: {checked: boolean}) => (
  <View style={[styles.checkbox, checked && styles.checkedBox]}>
    {checked ? (
      <Icon name="check" size={14} color="white" />
    ) : (
      <Icon name="square-o" size={12} color="white" />
    )}
  </View>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#1c56ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkedBox: {
    backgroundColor: '#1c56ff',
  },
});

export default Checkbox;
