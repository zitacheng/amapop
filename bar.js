import React, { useEffect } from 'react';
import Home from './container/Home.js';
import History from './container/History.js';
import Favorite from './container/Favorite.js';
import Profile from './container/Profile.js';
import {Image} from 'react-native';
import user from './assets/user.png';
import gift from './assets/gift.png';
import pop from './assets/pop.png';
import box from './assets/box.png';
import {basic} from './constant/basic.js';
import {color} from './constant/color.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
export function TabScreen({navigation, route}) {
  console.log("route ", route);

  useEffect(() => {
    console.log("route ", route)
  }, [navigation, route]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor='white'
      inactiveColor='white'
      barStyle={{backgroundColor:color.pink}}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
        //   tabBarLabel: translate('home'),
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={gift} resizeMode="contain" />
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
              source={pop}
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
            <Image style={basic.barIcon} source={box} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={user} resizeMode="contain" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
