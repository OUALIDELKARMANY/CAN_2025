import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

// App = composant racine de l'application.
// Ici on place les éléments globaux (StatusBar) et on monte la navigation principale.
export default function App() {
  return (
    <>
      {/* Barre de statut globale (couleur/texte). */}
      <StatusBar style="light" backgroundColor="#006233" />

      {/* Navigation de l'app (Bottom Tabs). */}
      <AppNavigator />
    </>
  );
}
