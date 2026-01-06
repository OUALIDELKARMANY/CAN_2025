import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../styles/theme';

// Navigation principale de l'application.
// Ici on utilise une Bottom Tab Navigation (barre d'onglets en bas).
// Chaque Tab.Screen correspond à une "page" (screen) du dossier src/screens.

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
        // NavigationContainer = racine de React Navigation.
        <NavigationContainer>
            <Tab.Navigator
                // screenOptions applique des options par défaut à tous les onglets.
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#8B1538',
                    tabBarInactiveTintColor: colors.neutral.gray400,
                    tabBarStyle: {
                        backgroundColor: colors.neutral.white,
                        borderTopWidth: 0,
                        paddingBottom: 8,
                        paddingTop: 8,
                        height: 65,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: 'bold',
                        marginTop: 2,
                    },
                }}
            >
                <Tab.Screen
                    // "name" est l'identifiant interne de l'écran pour navigation.navigate('Home').
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
                    // Onglet Matchs (écran MatchesScreen).
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
