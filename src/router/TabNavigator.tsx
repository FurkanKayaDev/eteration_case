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
  const Tab = createBottomTabNavigator();
  const {cartItems} = useAppSelector(state => state.cart);
  return (
    <Tab.Navigator>
      <Tab.Screen
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
      <Tab.Screen
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
      <Tab.Screen
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
      <Tab.Screen
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
    </Tab.Navigator>
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
