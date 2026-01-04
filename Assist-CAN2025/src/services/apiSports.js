import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://v3.football.api-sports.io';

const STORAGE_KEYS = {
    AFCON_LEAGUE: '@assist_can_afcon_league',
    CACHE_PREFIX: '@assist_can_api_cache:',
};

const CACHE_TTL_MS = 10 * 60 * 1000;

const getApiKey = () => {
    // Prefer Expo public env var if set, fallback to the provided key.
    return process.env.EXPO_PUBLIC_API_SPORTS_KEY || 'ef5c73db7a9d50f375ecce2bb9f35429';
};

const buildCacheKey = (path, params) => {
    const sorted = Object.keys(params || {})
        .sort()
        .reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

    return `${STORAGE_KEYS.CACHE_PREFIX}${path}?${JSON.stringify(sorted)}`;
};

const readCache = async (cacheKey) => {
    try {
        const raw = await AsyncStorage.getItem(cacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.timestamp || typeof parsed.timestamp !== 'number') return null;
        if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
        return parsed.data ?? null;
    } catch {
        return null;
    }
};

const writeCache = async (cacheKey, data) => {
    try {
        await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data })
        );
    } catch {
        // ignore cache write errors
    }
};

const apiRequest = async (path, params = {}) => {
    const cacheKey = buildCacheKey(path, params);
    const cached = await readCache(cacheKey);
    if (cached) return cached;

    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        query.append(key, String(value));
    });

    const url = `${API_BASE_URL}${path}${query.toString() ? `?${query.toString()}` : ''}`;

    const res = await fetch(url, {
        headers: {
            'x-apisports-key': getApiKey(),
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`API error (${res.status}) ${text}`);
    }

    const json = await res.json();
    await writeCache(cacheKey, json);
    return json;
};

const pickAfconLeague = (leaguesResponse) => {
    const list = leaguesResponse?.response || [];

    const normalized = list
        .map((item) => ({
            leagueId: item?.league?.id,
            leagueName: item?.league?.name,
            country: item?.country?.name,
        }))
        .filter((x) => x.leagueId && x.leagueName);

    const exact = normalized.find(
        (x) => x.leagueName.toLowerCase() === 'africa cup of nations'
    );
    if (exact) return exact;

    const contains = normalized.find((x) =>
        x.leagueName.toLowerCase().includes('africa cup of nations')
    );
    if (contains) return contains;

    const afcon = normalized.find((x) => x.leagueName.toLowerCase().includes('afcon'));
    if (afcon) return afcon;

    return normalized[0] || null;
};

export const getAfconLeague = async () => {
    const cachedRaw = await AsyncStorage.getItem(STORAGE_KEYS.AFCON_LEAGUE);
    if (cachedRaw) {
        try {
            const parsed = JSON.parse(cachedRaw);
            if (parsed?.leagueId) return parsed;
        } catch {
            // ignore
        }
    }

    const json = await apiRequest('/leagues', {
        search: 'Africa Cup of Nations',
    });

    const selected = pickAfconLeague(json);
    if (!selected?.leagueId) {
        throw new Error('Impossible de trouver la compétition Africa Cup of Nations via l’API');
    }

    await AsyncStorage.setItem(STORAGE_KEYS.AFCON_LEAGUE, JSON.stringify(selected));
    return selected;
};

const mapFixtureToMatch = (fixtureItem) => {
    const fixture = fixtureItem?.fixture;
    const teams = fixtureItem?.teams;
    const league = fixtureItem?.league;
    const venue = fixture?.venue;
    const goals = fixtureItem?.goals;

    const home = teams?.home;
    const away = teams?.away;

    const homeGoals = typeof goals?.home === 'number' ? goals.home : null;
    const awayGoals = typeof goals?.away === 'number' ? goals.away : null;

    const score = homeGoals !== null && awayGoals !== null ? `${homeGoals}-${awayGoals}` : null;

    return {
        id: fixture?.id,
        equipe1: home?.name || 'Équipe 1',
        equipe2: away?.name || 'Équipe 2',
        logo1: home?.logo || null,
        logo2: away?.logo || null,
        drapeau1: '',
        drapeau2: '',
        date: fixture?.date || null,
        ville: venue?.city || '',
        stade: venue?.name || '',
        phase: league?.round || league?.name || '',
        score,
        status: fixture?.status?.short || fixture?.status?.long || '',
    };
};

export const getAfconFixtures = async ({ season = 2025, status } = {}) => {
    const league = await getAfconLeague();

    const json = await apiRequest('/fixtures', {
        league: league.leagueId,
        season,
        status,
    });

    const fixtures = json?.response || [];
    const matches = fixtures
        .map(mapFixtureToMatch)
        .filter((m) => m.id && m.date);

    return matches;
};

export default {
    getAfconLeague,
    getAfconFixtures,
};
