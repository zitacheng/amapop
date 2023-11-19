import React, { useEffect } from 'react';
import Home from './container/Home.js';
import Chat from './container/Chat.js';
import Settings from './container/Settings.js';
import Profile from './container/Profile.js';
import {Image} from 'react-native';
import user from './assets/userOn.png';
import gift from './assets/giftOn.png';
import pop from './assets/popOn.png';
import chat from './assets/chat.png';
import {basic} from './constant/basic.js';
import {color} from './constant/color.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
export function TabScreen({navigation, route}) {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={color.pink}
      inactiveColor={color.pink}
      // barStyle={{backgroundColor:color.orange}}
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
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={chat} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image style={basic.barIcon} source={user} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <Image
              style={basic.barIcon}
              source={pop}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
