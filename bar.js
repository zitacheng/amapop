import React from 'react';
import Home from './container/Home.js';
import History from './container/History.js';
import Favorite from './container/Favorite.js';
import Profile from './container/Profile.js';
import {Image} from 'react-native';
import userOn from './assets/userOn.png';
import giftOn from './assets/giftOn.png';
import popOn from './assets/popOn.png';
import boxOn from './assets/boxOn.png';
import {basic} from './constant/basic.js';
import {color} from './constant/color.js';
// import {translate} from './constant/config.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
export function TabScreen({navigation, route}) {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: color.pink,
        showLabel: false,
        tabStyle: {
          backgroundColor: color.lightOrange,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
        //   tabBarLabel: translate('home'),
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={giftOn} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: () => (
            <Image
              style={basic.barIcon}
              source={popOn}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={boxOn} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={userOn} resizeMode="contain" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
