import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartPage from '../screens/CartPage';
import FavouritesPage from '../screens/FavouritesPage';
import ProductList from '../screens/ProductList';
import ProfilePage from '../screens/ProfilePage';
import * as Icons from '../assets/icons';
import Header from '../components/Header';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icons.Home />,
          header: () => <Header />,
          headerShown: true,
          tabBarShowLabel: false,
        }}
        name="ProductList"
        component={ProductList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icons.Basket />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="CartPage"
        component={CartPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icons.Star />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="FavouritesPage"
        component={FavouritesPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icons.Profile />,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="ProfilePage"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
