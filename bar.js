import React, { useEffect } from 'react';
import Home from './container/Home.js';
import Creation from './container/Creation.js';
import Settings from './container/Settings.js';
import Profile from './container/Profile.js';
import {Image, View} from 'react-native';
import user from './assets/userOn.png';
import gift from './assets/giftOn.png';
import pop from './assets/popOn.png';
import plus from './assets/plus.png';
import {basic} from './constant/basic.js';
import {color} from './constant/color.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Badge } from 'react-native-paper';

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
      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => (
            <View>
              <Image style={basic.barIcon} source={chat} resizeMode="contain" />
            </View>

          ),
        }}
      /> */}
      <Tab.Screen
        name="Creation"
        component={Creation}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: () => (
            <View>
              <Image style={basic.barIcon} source={plus} resizeMode="contain" />
            </View>

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
