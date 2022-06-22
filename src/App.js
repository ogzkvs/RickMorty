import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Settings from './pages/Settings';
import MainStackNavigator from './navigations/MainStack';
import navigations from './navigations';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === navigations.mainTab.MainStack) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === navigations.mainTab.SettingsStack) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#29b6f6',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tabs.Screen
          name={navigations.mainTab.MainStack}
          component={MainStackNavigator}
          options={{
            title: 'Anasayfa',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name={navigations.mainTab.SettingsStack}
          component={Settings}
          options={{title: 'Ayarlar'}}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
