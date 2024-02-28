import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetail from '../../screens/ProductDetail';
import ProductList from '../../screens/ProductList';
import CustomHeader from '../../components/CustomHeader';

const HomeStackBridge = () => {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator>
      <Screen
        options={{headerShown: false}}
        name="ProductList"
        component={ProductList}
      />
      <Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({route}) => ({
          header: () => (
            <CustomHeader
              title={
                (route.params as {name?: string})?.name || 'Product Detail'
              }
            />
          ),
        })}
      />
    </Navigator>
  );
};

export default HomeStackBridge;

const styles = StyleSheet.create({});
