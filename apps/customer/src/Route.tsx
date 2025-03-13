import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './apps/Login';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '로그인'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
