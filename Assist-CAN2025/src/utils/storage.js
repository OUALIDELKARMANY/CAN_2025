import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const STORAGE_KEYS = {
    FAVORITES: '@assist_can_favorites',
    PROFILE: '@assist_can_profile',
    PREFERENCES: '@assist_can_preferences',
};

// Favorites management
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

export const getFavoriteMatches = async () => {
    try {
        const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
};

export const isFavoriteMatch = async (matchId) => {
    try {
        const favorites = await getFavoriteMatches();
        return favorites.includes(matchId);
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
};

// Profile management
export const saveProfile = async (profileData) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        return false;
    }
};

export const getProfile = async () => {
    try {
        const profile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
        return profile ? JSON.parse(profile) : null;
    } catch (error) {
        console.error('Error getting profile:', error);
        return null;
    }
};

// Preferences management
export const savePreferences = async (preferences) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('Error saving preferences:', error);
        return false;
    }
};

export const getPreferences = async () => {
    try {
        const preferences = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
        return preferences ? JSON.parse(preferences) : { language: 'fr', notifications: true };
    } catch (error) {
        console.error('Error getting preferences:', error);
        return { language: 'fr', notifications: true };
    }
};

// Clear all data
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
