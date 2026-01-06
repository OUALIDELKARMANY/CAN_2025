// Service AfricaTopSports - DÉSACTIVÉ.
// Anciennement: récupération/parse de contenu web.
// Actuellement: mode offline, pas d'appels réseau.
const OFFLINE_ERROR =
    'La couche AfricaTopSports a été supprimée (mode offline). Utilisez les données locales dans src/data.';

export const AFRICA_TOP_SPORTS_URLS = {};
export const AFRICA_TOP_SPORTS_PROGRAM_CITIES = [];

export const getTangerProgram = async () => {
    throw new Error(OFFLINE_ERROR);
};

export const getProgramByCity = async () => {
    throw new Error(OFFLINE_ERROR);
};
