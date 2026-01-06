import AsyncStorage from '@react-native-async-storage/async-storage';

// Utils de persistance locale (AsyncStorage).
// Rôle: centraliser la lecture/écriture des données locales de l'app.

// Clés utilisées dans AsyncStorage (noms stables pour stocker/récupérer les données).
const STORAGE_KEYS = {
    FAVORITES: '@assist_can_favorites',
    PROFILE: '@assist_can_profile',
    PREFERENCES: '@assist_can_preferences',
};

// Gestion des favoris (liste d'IDs de matchs).

// Ajoute un match aux favoris (si pas déjà présent).
export const saveFavoriteMatch = async (matchId) => {
    try {
        const favorites = await getFavoriteMatches();
        if (!favorites.includes(matchId)) {
            favorites.push(matchId);
            await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        }
        return true;
    } catch (error) {
        console.error('Error saving favorite:', error);
        return false;
    }
};

// Retire un match des favoris.
export const removeFavoriteMatch = async (matchId) => {
    try {
        const favorites = await getFavoriteMatches();
        const updated = favorites.filter(id => id !== matchId);
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
        return true;
    } catch (error) {
        console.error('Error removing favorite:', error);
        return false;
    }
};

// Récupère la liste des IDs favoris (tableau).
export const getFavoriteMatches = async () => {
    try {
        const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
};

// Vérifie si un ID de match est en favori.
export const isFavoriteMatch = async (matchId) => {
    try {
        const favorites = await getFavoriteMatches();
        return favorites.includes(matchId);
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
};

// Gestion du profil utilisateur.

// Sauvegarde l'objet profil (nom/prénom/etc.).
export const saveProfile = async (profileData) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        return false;
    }
};

// Récupère le profil (ou null si absent).
export const getProfile = async () => {
    try {
        const profile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
        return profile ? JSON.parse(profile) : null;
    } catch (error) {
        console.error('Error getting profile:', error);
        return null;
    }
};

// Gestion des préférences (ex: langue, notifications...).

// Sauvegarde un objet de préférences.
export const savePreferences = async (preferences) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Error saving preferences:', error);
        return false;
    }
};

// Récupère les préférences, ou des valeurs par défaut.
export const getPreferences = async () => {
    try {
        const preferences = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
        return preferences ? JSON.parse(preferences) : { language: 'fr', notifications: true };
    } catch (error) {
        console.error('Error getting preferences:', error);
        return { language: 'fr', notifications: true };
    }
};

// Réinitialisation: supprime toutes les données locales liées à l'app.
export const clearAllData = async () => {
    try {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.FAVORITES,
            STORAGE_KEYS.PROFILE,
            STORAGE_KEYS.PREFERENCES,
        ]);
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
};

export default {
    saveFavoriteMatch,
    removeFavoriteMatch,
    getFavoriteMatches,
    isFavoriteMatch,
    saveProfile,
    getProfile,
    savePreferences,
    getPreferences,
    clearAllData,
};
