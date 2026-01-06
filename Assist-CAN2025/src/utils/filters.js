// Utils de filtrage/tri/recherche pour les matchs.
// Ces fonctions sont "pures" (elles ne modifient pas l'état global),
// ce qui permet de les réutiliser facilement dans plusieurs écrans.

// Filtre une liste de matchs par ville.
export const filterMatchesByCity = (matches, city) => {
    if (!city || city === 'Toutes') return matches;
    return matches.filter(match => match.ville === city);
};

// Filtre une liste de matchs par équipe (équipe1 ou équipe2).
export const filterMatchesByTeam = (matches, team) => {
    if (!team || team === 'Toutes') return matches;
    return matches.filter(
        match => match.equipe1 === team || match.equipe2 === team
    );
};

// Filtre une liste de matchs par phase (Groupe, Quart, Demi, etc.).
export const filterMatchesByPhase = (matches, phase) => {
    if (!phase || phase === 'Toutes') return matches;
    return matches.filter(match => match.phase === phase);
};

// Filtre une liste de matchs entre deux dates (startDate/endDate).
export const filterMatchesByDate = (matches, startDate, endDate) => {
    if (!startDate && !endDate) return matches;

    return matches.filter(match => {
        const matchDate = new Date(match.date);
        if (startDate && matchDate < new Date(startDate)) return false;
        if (endDate && matchDate > new Date(endDate)) return false;
        return true;
    });
};

// Trie une liste de matchs par date (ascending=true => plus ancien d'abord).
export const sortMatchesByDate = (matches, ascending = true) => {
    return [...matches].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

// Renvoie la liste des villes uniques (avec 'Toutes' en premier pour le filtre).
export const getUniqueCities = (matches) => {
    const cities = matches.map(match => match.ville);
    return ['Toutes', ...new Set(cities)];
};

// Renvoie la liste des équipes uniques (avec 'Toutes' en premier pour le filtre).
export const getUniqueTeams = (matches) => {
    const teams = matches.flatMap(match => [match.equipe1, match.equipe2]);
    return ['Toutes', ...new Set(teams)].sort();
};

// Renvoie la liste des phases uniques (avec 'Toutes' en premier pour le filtre).
export const getUniquePhases = (matches) => {
    const phases = matches.map(match => match.phase);
    return ['Toutes', ...new Set(phases)];
};

// Recherche textuelle basique (équipe/ville/stade) dans une liste de matchs.
export const searchMatches = (matches, query) => {
    if (!query) return matches;

    const lowerQuery = query.toLowerCase();
    return matches.filter(match =>
        match.equipe1.toLowerCase().includes(lowerQuery) ||
        match.equipe2.toLowerCase().includes(lowerQuery) ||
        match.ville.toLowerCase().includes(lowerQuery) ||
        match.stade.toLowerCase().includes(lowerQuery)
    );
};

// Renvoie les prochains matchs (date > maintenant) avec une limite.
export const getUpcomingMatches = (matches, limit = 5) => {
    const now = new Date();
    return matches
        .filter(match => new Date(match.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
};

// Filtre les matchs joués dans un stade donné.
export const getMatchesByStadium = (matches, stadiumName) => {
    return matches.filter(match => match.stade === stadiumName);
};

export default {
    filterMatchesByCity,
    filterMatchesByTeam,
    filterMatchesByPhase,
    filterMatchesByDate,
    sortMatchesByDate,
    getUniqueCities,
    getUniqueTeams,
    getUniquePhases,
    searchMatches,
    getUpcomingMatches,
    getMatchesByStadium,
};
