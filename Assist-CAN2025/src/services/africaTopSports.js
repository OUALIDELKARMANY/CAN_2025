import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = '@assist_can_africatopsports:';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export const AFRICA_TOP_SPORTS_URLS = {
    CAN_GUIDE:
        'https://www.africatopsports.com/2025/10/03/can-2025-au-maroc-calendrier-billets-yalla-stades-le-guide-pratique/',
    TANGER_PROGRAM:
        'https://www.africatopsports.com/2025/12/03/can-2025-programme-des-matchs-a-tanger/',
    CASABLANCA_PROGRAM:
        'https://www.africatopsports.com/2025/12/08/can-2025-programme-matchs-a-casablanca/',
    AGADIR_PROGRAM:
        'https://www.africatopsports.com/2025/12/09/can-2025-programme-des-matchs-au-stade-adrar-dagadir/',
    FES_PROGRAM:
        'https://www.africatopsports.com/2025/12/09/can-2025-avec-nigeria-tunisie-le-programme-des-matchs-a-fes/',
};

export const AFRICA_TOP_SPORTS_PROGRAM_CITIES = [
    {
        key: 'tanger',
        label: 'Tanger',
        url: AFRICA_TOP_SPORTS_URLS.TANGER_PROGRAM,
    },
    {
        key: 'casablanca',
        label: 'Casablanca',
        url: AFRICA_TOP_SPORTS_URLS.CASABLANCA_PROGRAM,
    },
    {
        key: 'agadir',
        label: 'Agadir',
        url: AFRICA_TOP_SPORTS_URLS.AGADIR_PROGRAM,
    },
    {
        key: 'fes',
        label: 'Fès',
        url: AFRICA_TOP_SPORTS_URLS.FES_PROGRAM,
    },
];

const readCache = async (key) => {
    try {
        const raw = await AsyncStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.ts || !parsed?.data) return null;
        if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
        return parsed.data;
    } catch {
        return null;
    }
};

const writeCache = async (key, data) => {
    try {
        await AsyncStorage.setItem(
            `${STORAGE_PREFIX}${key}`,
            JSON.stringify({ ts: Date.now(), data })
        );
    } catch {
        // noop
    }
};

const stripHtml = (html) => {
    if (!html) return '';

    return html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
};

const fetchHtml = async (url) => {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Assist-CAN2025/1.0',
            Accept: 'text/html',
        },
    });

    if (!res.ok) {
        throw new Error(`africatopsports http ${res.status}`);
    }

    return await res.text();
};

const parseTangerProgram = (plainText) => {
    // Legacy name; this parser is now shared across cities.
    // Supports patterns:
    // - 23 décembre 2025 : Sénégal – Botswana (16h00)
    // - 23 décembre, 18h30 : Nigéria vs Tanzanie
    // - 22 décembre : Mali – Zambie (Groupe A, 15h00)

    const text = plainText
        .replace(/\u200b/g, ' ')
        .replace(/\s*:\s*/g, ' : ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s+/g, ' ');

    // Split aggressively - ATS posts often have all matches in one paragraph.
    const chunks = text.split(/(?:(?<=\))\s+)|(?:(?<=\d{2}h\d{2})\s+)|(?:(?<=\d{2}h\d{2})\s*\u00a0)/);

    const items = [];

    for (const raw of chunks) {
        const line = raw.trim();
        if (!line) continue;

        // Pattern A: 23 décembre 2025 : Sénégal – Botswana (16h00)
        let m = line.match(
            /(\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4})\s*:\s*([^()]+?)\s*\(([^)]+)\)/
        );
        if (m) {
            items.push({
                dateLabel: m[1].trim(),
                matchLabel: m[2].trim(),
                timeLabel: m[3].trim(),
            });
            continue;
        }

        // Pattern B: 23 décembre, 18h30 : Nigéria vs Tanzanie
        m = line.match(
            /(\d{1,2}\s+[A-Za-zÀ-ÿ]+)(?:\s+\d{4})?\s*,\s*([^:]+?)\s*:\s*(.+)/
        );
        if (m) {
            items.push({
                dateLabel: m[1].trim(),
                matchLabel: m[3].trim(),
                timeLabel: m[2].trim(),
            });
            continue;
        }

        // Pattern C: 22 décembre : Mali – Zambie (Groupe A, 15h00)
        m = line.match(
            /(\d{1,2}\s+[A-Za-zÀ-ÿ]+)\s*:\s*([^()]+?)\s*\((?:[^,]+,\s*)?([0-9]{1,2}h[0-9]{2})\)/
        );
        if (m) {
            items.push({
                dateLabel: m[1].trim(),
                matchLabel: m[2].trim(),
                timeLabel: m[3].trim(),
            });
        }
    }

    // Remove obvious duplicates while preserving order.
    const seen = new Set();
    return items.filter((it) => {
        const key = `${it.dateLabel}|${it.matchLabel}|${it.timeLabel}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

export const getTangerProgram = async ({ forceRefresh = false } = {}) => {
    const cacheKey = 'tanger_program_v1';

    if (!forceRefresh) {
        const cached = await readCache(cacheKey);
        if (cached) return cached;
    }

    const html = await fetchHtml(AFRICA_TOP_SPORTS_URLS.TANGER_PROGRAM);
    const plain = stripHtml(html);
    const parsed = parseTangerProgram(plain);

    await writeCache(cacheKey, parsed);
    return parsed;
};

export const getProgramByCity = async (cityKey, { forceRefresh = false } = {}) => {
    const city = AFRICA_TOP_SPORTS_PROGRAM_CITIES.find((c) => c.key === cityKey);
    if (!city) throw new Error('Ville non supportée');

    const cacheKey = `program_${city.key}_v1`;
    if (!forceRefresh) {
        const cached = await readCache(cacheKey);
        if (cached) return cached;
    }

    const html = await fetchHtml(city.url);
    const plain = stripHtml(html);
    const parsed = parseTangerProgram(plain);

    await writeCache(cacheKey, parsed);
    return parsed;
};
