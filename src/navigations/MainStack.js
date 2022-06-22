import React from 'react';
import Home from '../pages/Home';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigations from '../navigations';
import Episode from '../pages/Episode';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={navigations.mainStack.Home}
        component={Home}
        options={{
          headerTitleAlign: 'center',
          title: 'Rick & Morty Tüm Bölümler',
        }}
      />
      <MainStack.Screen
        name={navigations.mainStack.Episode}
        component={Episode}
        options={{
          title: 'Karakterler',
          headerTitleAlign: 'center',
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
