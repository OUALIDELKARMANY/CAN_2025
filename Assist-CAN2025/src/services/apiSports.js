// Service API (API-Sports) - DÉSACTIVÉ.
// Le projet est en mode offline: on utilise uniquement les données locales dans src/data.
// Si tu veux réactiver une API plus tard, c'est ici que tu brancheras les requêtes réseau.
const API_DISABLED_ERROR =
    'La couche API a été supprimée (mode offline). Utilisez les données locales dans src/data.';

export const getAfconLeague = async () => {
    throw new Error(API_DISABLED_ERROR);
};

export const getAfconFixtures = async () => {
    throw new Error(API_DISABLED_ERROR);
};

export default {
    getAfconLeague,
    getAfconFixtures,
};
