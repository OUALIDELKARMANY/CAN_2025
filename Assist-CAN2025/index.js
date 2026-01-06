import { registerRootComponent } from 'expo';

import App from './App';

// Point d'entrée Expo.
// registerRootComponent enregistre App auprès de React Native.
// Cela marche aussi bien dans Expo Go que dans un build natif.
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
