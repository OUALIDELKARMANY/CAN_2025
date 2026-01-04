import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../styles/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import StadiumsScreen from '../screens/StadiumsScreen';
import CitiesScreen from '../screens/CitiesScreen';
import HotelsScreen from '../screens/HotelsScreen';
import AssistanceScreen from '../screens/AssistanceScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary.green,
                    tabBarInactiveTintColor: colors.neutral.gray500,
                    tabBarStyle: {
                        backgroundColor: colors.neutral.white,
                        borderTopWidth: 1,
                        borderTopColor: colors.neutral.gray200,
                        paddingBottom: 5,
                        paddingTop: 5,
                        height: 60,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Accueil',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>🏠</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Matches"
                    component={MatchesScreen}
                    options={{
                        tabBarLabel: 'Matchs',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>⚽</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Stadiums"
                    component={StadiumsScreen}
                    options={{
                        tabBarLabel: 'Stades',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>🏟️</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Cities"
                    component={CitiesScreen}
                    options={{
                        tabBarLabel: 'Villes',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>🏙️</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Hotels"
                    component={HotelsScreen}
                    options={{
                        tabBarLabel: 'Hotels',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>🏨</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Assistance"
                    component={AssistanceScreen}
                    options={{
                        tabBarLabel: 'Aide',
                        tabBarIcon: ({ color, size }) => (
                            <Text style={{ fontSize: 24, color }}>🆘</Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
