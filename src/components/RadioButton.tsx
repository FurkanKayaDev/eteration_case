import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    <View style={styles.radioCircle} />
    {selected && <View style={styles.checkedCircle} />}
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1c56ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioText: {
    marginLeft: 10,
  },
  checkedCircle: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: '#1c56ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadioButton;
