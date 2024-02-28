import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartPage from '../screens/CartPage';
import FavouritesPage from '../screens/FavouritesPage';

import ProfilePage from '../screens/ProfilePage';
import HomeStackBridge from './Bridges/HomeStackBridge';
import {Basket, Home, Profile, Star} from '../assets/icons';
import {useAppSelector} from '../redux/store';
const TabNavigator = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  const {cartItems} = useAppSelector(state => state.cart);
  return (
    <Navigator>
      <Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Home fill={focused ? '#1c56ff' : 'white'} />
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarAccessibilityLabel: 'Home',
        }}
        name="HomeStackBridge"
        component={HomeStackBridge}
      />
      <Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <View style={styles.cardCount}>
                <Text style={styles.countText}>{cartItems.length}</Text>
              </View>
              <Basket fill={focused ? '#1c56ff' : 'white'} />
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="CartPage"
        component={CartPage}
      />
      <Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Star fill={focused ? '#1c56ff' : 'white'} />
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="FavouritesPage"
        component={FavouritesPage}
      />
      <Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Profile fill={focused ? '#1c56ff' : 'white'} />
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="ProfilePage"
        component={ProfilePage}
      />
    </Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  cardCount: {
    position: 'absolute',
    top: 0,
    right: -10,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  countText: {
    color: 'white',
  },
});
