# Assist-CAN2025 — Documentation du projet

## Vue d’ensemble
Ce projet est une application **React Native (Expo)** qui affiche des informations autour de la **CAN 2025**.

L’app est organisée autour de :
- **Entrée Expo** (`index.js`)
- **Composant racine** (`App.js`)
- **Navigation** (`src/navigation/AppNavigator.js`) via **React Navigation**
- **Écrans (pages)** (`src/screens/*`)
- **Composants UI réutilisables** (`src/components/*`)
- **Données locales** (`src/data/*.json`) utilisées en mode offline
- **Utilitaires** (`src/utils/*`)
- **Styles / thème** (`src/styles/theme.js`)

## Architecture générale (data-flow)

### 1) Démarrage de l’app
- **`index.js`**
  - Point d’entrée Expo.
  - Enregistre le composant racine (`App`) via `registerRootComponent`.

- **`App.js`**
  - Rend le `StatusBar`.
  - Monte la navigation principale via `AppNavigator`.

### 2) Navigation
- **`src/navigation/AppNavigator.js`**
  - Définit la navigation principale en **Bottom Tabs**.
  - Déclare les écrans de l’application :
    - `Home` → `HomeScreen`
    - `Matches` → `MatchesScreen`
    - `Stadiums` → `StadiumsScreen`
    - `Cities` → `CitiesScreen`
    - `Hotels` → `HotelsScreen`
    - `Assistance` → `AssistanceScreen`

### 3) Données (mode offline)
- Les écrans **ne dépendent pas d’un backend**.
- Les matchs sont chargés depuis **`src/data/matches.json`**.
- Les favoris / profil sont stockés en local via **AsyncStorage**.

### 4) Composants UI
- Les écrans consomment des données (JSON + AsyncStorage) et rendent une UI composée de composants réutilisables (`Card`, `Header`, `MatchCard`, etc.).

## Dossiers & fichiers

## Racine du projet
- **`package.json`**
  - Dépendances et scripts (`start`, `android`, `ios`, `web`).

- **`package-lock.json`**
  - Lockfile npm.

- **`app.json`**
  - Configuration Expo (nom, icônes, splash…).

- **`assets/`**
  - Images statiques (ex: `icon.png`, `splash-icon.png`).

- **`api_result.txt`**
  - Fichier de données / trace (non utilisé par l’exécution de l’app, sauf si importé explicitement).

## `src/` — Code applicatif

## `src/navigation/`
- **`AppNavigator.js`**
  - Navigation principale (Bottom Tabs).

## `src/screens/` — Pages (écrans)
- **`HomeScreen.js`**
  - Page d’accueil.
  - Affiche des sections (hero, accès rapides, prochains matchs).
  - Charge les matchs depuis `src/data/matches.json`.
  - Gère les favoris via `src/utils/storage.js`.

- **`MatchesScreen.js`**
  - Page liste des matchs.
  - Affiche une liste filtrable (recherche + filtre ville + filtre équipe).
  - Source: `src/data/matches.json`.
  - Favoris: `src/utils/storage.js`.

- **`StadiumsScreen.js`**
  - Page des stades.
  - Utilise `src/data/stadiums.json`.
  - S’appuie sur `src/components/stadiums/StadiumCard.js`.

- **`CitiesScreen.js`**
  - Page des villes.
  - Utilise `src/data/cities.json`.
  - S’appuie sur `src/components/cities/CityCard.js`.

- **`HotelsScreen.js`**
  - Page des hôtels.
  - Utilise `src/data/hotels.json`.

- **`AssistanceScreen.js`**
  - Page d’aide (contacts d’urgence, conseils).
  - Peut ouvrir des liens / actions système selon l’implémentation.
  - Utilise `src/data/emergencyContacts.json`.

- **`ProfileScreen.js`**
  - Page profil utilisateur.
  - Stockage local via `AsyncStorage` : profil + IDs des favoris.
  - Reconstitue la liste des matchs favoris depuis `src/data/matches.json`.

## `src/components/` — Composants réutilisables

### `src/components/common/`
- **`Header.js`**
  - En-tête réutilisable (titre + sous-titre + action optionnelle).

- **`Card.js`**
  - Wrapper UI (carte) réutilisable, supporte `onPress`.

- **`Button.js`**
  - Bouton stylé réutilisable.

- **`SkeletonMatchCard.js`**
  - Skeleton de chargement pour les cartes match.

### `src/components/matches/`
- **`MatchCard.js`**
  - Affichage d’un match :
    - date/heure (formatées)
    - équipes, drapeaux/logos
    - ville + stade
    - phase
    - bouton favori

### `src/components/cities/`
- **`CityCard.js`**
  - Carte UI pour une ville (infos + style).

### `src/components/stadiums/`
- **`StadiumCard.js`**
  - Carte UI pour un stade (infos + style).

## `src/data/` — Données locales (JSON)
- **`matches.json`**
  - Source des matchs affichés dans Accueil + Matches.

- **`matchesDemo.json`**
  - Dataset de démonstration (non obligatoire).

- **`cities.json`**
  - Données des villes.

- **`stadiums.json`**
  - Données des stades.

- **`hotels.json`**
  - Données des hôtels.

- **`emergencyContacts.json`**
  - Contacts d’urgence / assistance.

## `src/utils/`
- **`storage.js`**
  - Accès à `AsyncStorage`.
  - Gère :
    - favoris (`saveFavoriteMatch`, `removeFavoriteMatch`, `getFavoriteMatches`)
    - profil (ex: `getProfile`, `saveProfile`) si présent dans le fichier.

- **`filters.js`**
  - Fonctions pures de filtrage/tri/recherche des matchs.
  - Ex: `sortMatchesByDate`, `filterMatchesByCity`, `filterMatchesByTeam`, etc.

## `src/styles/`
- **`theme.js`**
  - Thème global : `colors`, `typography`, `spacing`, `borderRadius`, `shadows`, `commonStyles`.

## `src/services/` — Couche services (désactivée)
- **`apiSports.js`**
  - Couche API-Sports.
  - Actuellement **désactivée** : les fonctions lèvent une erreur (mode offline).

- **`africaTopSports.js`**
  - Ancien service de récupération/parse de contenu web.
  - Actuellement **désactivé** : les fonctions lèvent une erreur (mode offline).

## Notes / conventions
- Les écrans sont dans `src/screens`.
- Les composants UI partagés sont dans `src/components`.
- Les données locales sont dans `src/data`.
- Les accès stockage local sont centralisés dans `src/utils/storage.js`.

## Exécution
- `npm install`
- `npm run start`
