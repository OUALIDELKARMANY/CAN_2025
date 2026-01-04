// Filter utilities for matches

export const filterMatchesByCity = (matches, city) => {
    if (!city || city === 'Toutes') return matches;
    return matches.filter(match => match.ville === city);
};

export const filterMatchesByTeam = (matches, team) => {
    if (!team || team === 'Toutes') return matches;
    return matches.filter(
        match => match.equipe1 === team || match.equipe2 === team
    );
};

export const filterMatchesByPhase = (matches, phase) => {
    if (!phase || phase === 'Toutes') return matches;
    return matches.filter(match => match.phase === phase);
};

export const filterMatchesByDate = (matches, startDate, endDate) => {
    if (!startDate && !endDate) return matches;

    return matches.filter(match => {
        const matchDate = new Date(match.date);
        if (startDate && matchDate < new Date(startDate)) return false;
        if (endDate && matchDate > new Date(endDate)) return false;
        return true;
    });
};

export const sortMatchesByDate = (matches, ascending = true) => {
    return [...matches].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

export const getUniqueCities = (matches) => {
    const cities = matches.map(match => match.ville);
    return ['Toutes', ...new Set(cities)];
};

export const getUniqueTeams = (matches) => {
    const teams = matches.flatMap(match => [match.equipe1, match.equipe2]);
    return ['Toutes', ...new Set(teams)].sort();
};

export const getUniquePhases = (matches) => {
    const phases = matches.map(match => match.phase);
    return ['Toutes', ...new Set(phases)];
};

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

export const getUpcomingMatches = (matches, limit = 5) => {
    const now = new Date();
    return matches
        .filter(match => new Date(match.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
};

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
