import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case 'Home':
      return 'home-outline';
    case 'Profile':
      return 'person-outline';
    default:
      return 'help-outline';
  }
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarStyle: { backgroundColor: '#1E1E1E' },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#A9A9A9',
        headerStyle: { backgroundColor: '#1E1E1E' },
        headerTintColor: '#FFD700',
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={getTabBarIcon(route.name)} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
