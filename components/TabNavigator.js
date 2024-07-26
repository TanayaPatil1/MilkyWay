// import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import UpdateMenuItem from './UpdateMenuItem';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose another icon set
import { COLORS } from './color';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'UpdateMenu') {
            iconName = focused ? 'create' : 'create-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.darkpurple,
        tabBarInactiveTintColor: COLORS.lightpurple,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="UpdateMenu" component={UpdateMenuItem} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
