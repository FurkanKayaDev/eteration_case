import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'mediumblue',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        E-Market
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
