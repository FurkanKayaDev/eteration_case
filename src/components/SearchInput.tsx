import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  icon?: string;
  placeholder?: string;
  containerStyle?: object;
  inputStyle?: object;
  backgroundColor?: string;
}

const SearchInput = ({
  value,
  setValue,
  icon,
  placeholder,
  containerStyle,
  inputStyle,
  backgroundColor,
}: SearchInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.input, inputStyle]}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={{flex: 1}}
        />
        {icon && (
          <View style={styles.icon}>
            <Text>{icon}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 40,
    elevation: 5,
  },
});
